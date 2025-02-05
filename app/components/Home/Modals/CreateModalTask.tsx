import { Modal, Text, Pressable, View, TextInput, Switch, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { IconDownload, IconNews, IconX } from "@tabler/icons-react-native";
import { useForm, Controller } from "react-hook-form";
import taskSchema, { taskSchemaType } from "@/app/validations/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITask } from "@/models/task";
import { TaskRepository } from "@/repository/task/taskRepository";
import { TaskService } from "@/services/taskService";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    created: (data: Partial<ITask> | null) => void;
}
const repository = new TaskRepository(process.env.EXPO_PUBLIC_API_URL as string)
const taskService = new TaskService(repository)

const CreateModalTask: React.FC<Props> = ({ isOpen, onClose, created }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<taskSchemaType>({
        resolver: zodResolver(taskSchema)
    });

    const [estado, setEstado] = useState<boolean>(false);
    const [task, setTask] = useState<Partial<ITask> | null>(null)
    const onSubmit = (data: taskSchemaType) => {
        setTask({
            titulo: data.titulo,
            descripcion: data.descripcion,
            estado: data.estado
        })
        reset();
        onClose();
    };

    useEffect(() => {
        if (task) {
            taskService.create(task.titulo ?? '', task.descripcion ?? '', task.estado ?? false)
                .then((data) => {
                    created(data)
                })
                .catch((e) => {
                    console.log(e);

                })
        }
    }, [task])

    return (
        <Modal visible={isOpen} animationType="fade" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <View className="flex-row items-center gap-x-2">
                            <IconNews />
                            <Text className="font-semibold">Nueva Tarea</Text>
                        </View>
                        <Pressable onPress={() => onClose()}>
                            <IconX color={'gray'} size={20} />
                        </Pressable>
                    </View>

                    <View className="flex-col items-center justify-between" style={styles.content}>
                        <Controller
                            control={control}
                            name="titulo"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="border p-2 rounded-md w-full" style={{ borderColor: '#93c5fd', borderWidth: 1 }}>
                                    <TextInput
                                        placeholder="Título de la tarea"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        className="w-full"
                                    />
                                    {errors.titulo && <Text style={{ color: 'red' }}>{errors.titulo.message}</Text>}
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="descripcion"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="border p-2 rounded-md w-full" style={{ borderColor: '#93c5fd', borderWidth: 1 }}>
                                    <TextInput
                                        placeholder="Descripción de la tarea"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        className="w-full"
                                    />
                                    {errors.descripcion && <Text style={{ color: 'red' }}>{errors.descripcion.message}</Text>}
                                </View>
                            )}
                        />

                        <View className="flex-row gap-x-2 items-center justify-start">
                            <Text>Estado:</Text>
                            <Controller
                                control={control}
                                name="estado"
                                render={({ field: { value, onChange } }) => (
                                    <Switch
                                        value={value}
                                        onValueChange={(val) => {
                                            setEstado(val);
                                            onChange(val);
                                        }}
                                    />
                                )}
                            />
                        </View>

                        <Pressable
                            onPress={handleSubmit(onSubmit)}
                            style={{ backgroundColor: '#2563eb' }}
                            className="flex-row w-full p-2 rounded-md items-center gap-x-2 justify-center"
                        >
                            <IconDownload color={'white'} />
                            <Text style={{ color: 'white' }}>Guardar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        marginTop: 10,
        gap: 10,
    },
});

export default CreateModalTask;
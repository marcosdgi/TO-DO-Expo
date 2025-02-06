import { Modal, Text, Pressable, View, TextInput, Switch, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { IconDownload, IconX } from "@tabler/icons-react-native";
import { ITask } from "@/models/task";
import { TaskRepository } from "@/repository/task/taskRepository";
import { TaskService } from "@/services/taskService";

interface Props {
    isEditing: boolean;
    onClose: (editedTask?: ITask) => void;
    task: ITask;
}

const repository = new TaskRepository(process.env.EXPO_PUBLIC_API_URL as string)
const taskService = new TaskService(repository)

const EditModalTask: React.FC<Props> = ({ isEditing, onClose, task }) => {
    const [taskValues, setTaskValues] = useState<{ titulo: string, descripcion: string, estado: boolean }>({
        titulo: task.titulo,
        descripcion: task.descripcion,
        estado: task.estado
    });
    const handleChange = useCallback((key: keyof typeof taskValues, value: string | boolean) => {
        setTaskValues(prev => ({ ...prev, [key]: value }));
    }, [taskValues])

    const handleSave = () => {
        const dataToUpdate = {
            titulo: taskValues.titulo || task.titulo,
            descripcion: taskValues.descripcion || task.descripcion,
            estado: taskValues.estado
        };

        if (dataToUpdate) {
            taskService.update(
                dataToUpdate.titulo,
                dataToUpdate.descripcion,
                dataToUpdate.estado,
                task.id
            ).then(
                (data) => {
                    onClose(data)
                })
        }

        onClose();
    };

    return (
        <Modal visible={isEditing} animationType="fade" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Pressable onPress={() => onClose()}>
                            <IconX color="gray" size={20} />
                        </Pressable>
                    </View>

                    <View className="flex-col gap-y-2 mt-3 items-center justify-between">
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Título de la tarea"
                                className="w-full h-10 p-2 rounded-md"
                                value={taskValues.titulo}
                                onChangeText={(text) => handleChange("titulo", text)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Escriba la descripción de su tarea"
                                className="w-full h-auto p-2 rounded-md"
                                value={taskValues.descripcion}
                                onChangeText={(text) => handleChange("descripcion", text)}
                            />
                        </View>

                        <View className="flex-row gap-x-2 items-center justify-start">
                            <Text>Estado:</Text>
                            <Switch
                                value={taskValues.estado}
                                onValueChange={(value) => handleChange("estado", value)}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <IconDownload color="white" />
                            <Text style={styles.saveButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    inputContainer: {
        borderColor: "#93c5fd",
        borderWidth: 1,
        borderRadius: 8,
        width: "100%",
        paddingHorizontal: 5,
    },
    saveButton: {
        backgroundColor: "#2563eb",
        flexDirection: "row",
        width: "100%",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    saveButtonText: {
        color: "white",
        marginLeft: 5,
    },
});

export default EditModalTask;

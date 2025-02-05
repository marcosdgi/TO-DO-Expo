import { Modal, Text, Pressable, View, TextInput, Switch, StyleSheet, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { IconDownload, IconUpload, IconX } from "@tabler/icons-react-native";
import { ITask } from "@/models/task";

interface Props {
    isEditing: boolean
    onClose: () => void;
    task:ITask
}

const EditModalTask: React.FC<Props> = ({ isEditing, onClose }) => {

    const [estado, setEstado] = useState<boolean>(false)

    return (
        <Modal
            visible={isEditing}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Pressable onPress={() => onClose()}>
                            <IconX color={'gray'} size={20} />
                        </Pressable>
                    </View>

                    <View className="flex-col gap-y-2 mt-3 items-center justify-between" >
                        <View style={{ borderColor: '#93c5fd', borderWidth: 1 }} className="rounded-md h-10 w-full">
                            <TextInput
                                placeholder="Titulo de la tarea"
                                className="w-full h-10 p-2 border-1 border-slate-300 rounded-md focus:border-blue-100"
                            />
                        </View>
                        <View style={{ borderColor: '#93c5fd', borderWidth: 1 }} className="rounded-md h-10 w-full">
                            <TextInput
                                placeholder="Escriba la descripción de su tarea"
                                multiline
                                className="w-full h-auto p-2 border-1 border-slate-300  rounded-md focus:border-blue-100"
                            />
                        </View>
                        <View className="flex-row gap-x-2 items-center justify-start">
                            <Text>Estado:</Text>
                            <Switch
                                value={estado}
                                onChange={() => {
                                    setEstado(!estado)
                                }}
                            />
                        </View>
                        <TouchableOpacity style={{ backgroundColor: '#2563eb' }} className="flex-row w-full p-2 rounded-md  bg-blue-600 items-center gap-x-2 justify-center">
                            <IconDownload color={'white'} />
                            <Text style={{ color: 'white' }}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    )
}

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
        justifyContent: 'flex-end',
    },
    content: {
        marginTop: 10,
        gap: 10,

    },


});

export default EditModalTask;
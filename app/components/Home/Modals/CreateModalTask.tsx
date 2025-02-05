import { Modal, Text, Pressable, View, TextInput, Switch, StyleSheet } from "react-native"
import React, { useState } from "react"
import { IconDownload, IconNews, IconUpload, IconX } from "@tabler/icons-react-native";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const CreateModalTask: React.FC<Props> = ({ isOpen, onClose }) => {

    const [estado, setEstado] = useState<boolean>(false)

    return (
        <Modal
            visible={isOpen}
            animationType="fade"
            transparent={true}
        >
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
                        <View className="border p-2 rounded-md w-full" style={{ borderColor: '#93c5fd', borderWidth: 1 }}>
                            <TextInput
                                placeholder="Titulo de la tarea"
                                className="w-full "
                            />
                        </View>

                        <View className="border p-2  rounded-md w-full" style={{ borderColor: '#93c5fd', borderWidth: 1 }}>
                            <TextInput
                                placeholder="Descripción de la tarea"
                                className="w-full "
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
                        <Pressable style={{ backgroundColor: '#2563eb' }} className="flex-row w-full p-2 rounded-md  bg-blue-600 items-center gap-x-2 justify-center">
                            <IconDownload color={'white'} />
                            <Text style={{ color: 'white' }}>Guardar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
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
        justifyContent: 'space-between',
    },
    content: {
        marginTop: 10,
        gap: 10,

    },


});

export default CreateModalTask;
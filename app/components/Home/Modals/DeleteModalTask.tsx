
import { IconTrash } from '@tabler/icons-react-native';
import React, { useState } from 'react'
import { Modal, Pressable, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
    taskId: number
    onClose: () => void;
    isOpen: boolean;
}

const DeleteModalTask: React.FC<Props> = ({ taskId, onClose, isOpen }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isOpen}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.message}>Esta seguro que desea eliminar esta tarea?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity className='flex-row items-center gap-x-2 justify-center' style={{ ...styles.button, backgroundColor: 'red' }} onPress={() => console.log(taskId)}>
                            <IconTrash color={'white'} size={20} />
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex items-center' style={{ ...styles.button, backgroundColor: 'blue' }} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})

export default DeleteModalTask
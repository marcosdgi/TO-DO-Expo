
import { ITask } from '@/models/task';
import { TaskRepository } from '@/repository/task/taskRepository';
import { TaskService } from '@/services/taskService';
import { IconTrash } from '@tabler/icons-react-native';
import React, { useCallback, useEffect, useState } from 'react'
import { Modal, Pressable, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
    taskId: number
    onClose: (deletedTask?: ITask) => void;
    isOpen: boolean;
    // onElimination: (deletedTask: ITask) => void;
}

const respository = new TaskRepository(process.env.EXPO_PUBLIC_API_URL as string)
const taskService = new TaskService(respository)

const DeleteModalTask: React.FC<Props> = ({ taskId, onClose, isOpen }) => {
    const [deletedTask, setDeletedTask] = useState<ITask | null>(null)

    const handleDelete = useCallback(() => {
        taskService.delete(taskId)
            .then((data) => {
                onClose(data)
            })
            .catch((e) => {
                console.log(e);
            })
        onClose()
    }, [])


    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isOpen}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.message}>Esta seguro que desea eliminar esta tarea?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity className='flex-row items-center gap-x-2 justify-center' style={{ ...styles.button, backgroundColor: 'red' }} onPress={handleDelete}>
                            <IconTrash color={'white'} size={20} />
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex items-center' style={{ ...styles.button, backgroundColor: 'blue' }} onPress={() => onClose()}>
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
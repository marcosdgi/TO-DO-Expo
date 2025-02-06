import { IconCheck, IconClockHour4, IconList, IconEdit, IconTrash, IconEye } from '@tabler/icons-react-native';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import EditModalTask from './Modals/EditModalTask';
import DeleteModalTask from './Modals/DeleteModalTask';
import ViewModalTask from './Modals/ViewModalTask';
import { ITask } from '@/models/task';

interface Props {
    task: ITask
    emitUpdatedTask: (updatedTask: ITask) => void
    emitDeletedTask: (deletedTaskId: ITask) => void
}


const Task: React.FC<Props> = ({ task, emitUpdatedTask, emitDeletedTask }) => {
    const translateX = useSharedValue<number>(0);
    const [editing, setEditing] = useState<boolean>(false)
    const [deleting, setDeleting] = useState<boolean>(false)
    const [viewDetails, setViewDetails] = useState<boolean>(false)

    const panGesture = Gesture.Pan()
        .failOffsetY([-2, 2])
        .onTouchesDown(() => {

            if (translateX.value === -100) translateX.value = withSpring(0);
        })
        .onUpdate((event) => {
            translateX.value = Math.min(0, event.translationX);
        })
        .onEnd(() => {
            if (translateX.value < -60) {
                translateX.value = withSpring(-150);
            } else {
                translateX.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));
    const handleEdit = useCallback((editedTask: ITask | undefined) => {
        if (editedTask) {
            emitUpdatedTask(editedTask)
        }
        setEditing(false)
        translateX.value = withSpring(0);
    }, [])


    const handleElimination = useCallback((deletedTask: ITask | undefined) => {
        if (deletedTask) {
            emitDeletedTask(deletedTask)
        }
        setEditing(false)
        translateX.value = withSpring(0);
    }, [])



    return (
        <GestureHandlerRootView>
            <View style={styles.container} >

                {/* Botones de Editar y Eliminar */}
                <View style={styles.actionsContainer} >

                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'orange' }]} onPress={() => setEditing(true)}>
                        <IconEdit color={'white'} size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={() => setDeleting(true)}>
                        <IconTrash color={'white'} size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'purple' }]} onPress={() => setViewDetails(true)}>
                        <IconEye color={'white'} size={24} />
                    </TouchableOpacity>

                </View>

                {/* Tarjeta deslizable */}
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.taskContainer, animatedStyle]}>
                        <Pressable className='w-full h-32 mt-2 gap-x-2 flex-row items-center justify-between bg-blue-100 p-2 rounded-md'>
                            <IconList color={'gray'} size={30} />
                            <View className='flex-col w-[60%] items-start gap-x-2 '>

                                <View className='flex-row items-start justify-start gap-x-2'>
                                    <Text className='font-semibold'>Título:</Text>
                                    <Text>{task.titulo}</Text>
                                </View>

                                <View className='flex-col mt-2 items-start justify-start'>
                                    <Text className='font-semibold'>Descripción:</Text>
                                    <Text ellipsizeMode='tail' style={{ width: 200 }} numberOfLines={2}>{task.descripcion}</Text>
                                </View>

                            </View>

                            <View className='w-auto'>

                                <View className='flex-row items-center gap-x-2'>
                                    <Text>{dayjs(task.createdAt).format('DD/MM/YYYY')}</Text>
                                </View>

                                <View className='flex-row items-center gap-x-1'>
                                    <Text>Estado:</Text>
                                    {task.estado ? (
                                        <IconCheck color={'green'} size={20} />
                                    ) : (
                                        <IconClockHour4 color={'orange'} size={20} />
                                    )}
                                </View>

                            </View>
                        </Pressable>
                    </Animated.View>
                </GestureDetector>
            </View>
            {/* Modales */}

            {/* Modal de edición */}
            <EditModalTask task={task} isEditing={editing} onClose={handleEdit} />

            {/* Modal de confirmacion para la eliminacion */}
            <DeleteModalTask
                taskId={task.id}
                isOpen={deleting}
                onClose={handleElimination} />
            {/* Modal para visualizar detalles de tarea */}
            <ViewModalTask task={task} isOpen={viewDetails} onClose={() => {
                setViewDetails(false)
                translateX.value = withSpring(0)
            }} />

        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginVertical: 4,
    },
    actionsContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 150,
        borderRadius: 10,
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    taskContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default Task;

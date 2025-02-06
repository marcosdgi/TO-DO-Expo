import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Text, FlatList } from 'react-native';
import Task from './Task';
import { ITask } from '@/models/task';
import { TaskRepository } from '@/repository/task/taskRepository';
import { TaskService } from '@/services/taskService';

interface Props {
    tasks: ITask[]
    fetchTasks: () => void
    deleteFilters: () => void
}

const repository = new TaskRepository(process.env.EXPO_PUBLIC_API_URL as string)
const taskService = new TaskService(repository)

const TasksList: React.FC<Props> = ({ tasks, fetchTasks, deleteFilters }) => {
    const [tasksState, setTasksState] = useState<ITask[]>([])

    const handleUpdatedTask = useCallback((updatedTask: ITask): void => {
        if (updatedTask) {
            setTasksState((prevTasks: ITask[]) =>
                prevTasks.map((task: ITask) => (task.id === updatedTask.id ? updatedTask : task))
            );
        }
        fetchTasks()
        deleteFilters()
    }, []);

    const handleElimination = useCallback((deletedTask: ITask) => {
        if (deletedTask) {
            setTasksState(prevTasks => prevTasks.filter(task => task.id !== deletedTask.id));
        }
        fetchTasks()
        deleteFilters()
    }, [])

    useEffect(() => {
        setTasksState(tasks)
    }, [tasks])


    const renderTaskList = useMemo(() => {
        return (
            <FlatList
                contentContainerStyle={{ paddingBottom: 100 }}
                data={tasksState}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <Task
                        emitUpdatedTask={handleUpdatedTask}
                        emitDeletedTask={handleElimination}
                        task={item}

                    />
                )}
            />
        );
    }, [tasksState, handleUpdatedTask, handleElimination]);

    return (
        <View className=" bg-transparent gap-y-2 p-2">
            <View className='flex-row items-center'>
                <Text className='text-xl text-blue-800'>Tareas</Text>
                <Text className='text-xl font-semibold text-blue-800'>({tasksState.length})</Text>
            </View>
            {renderTaskList}
        </View >
    )
}
export default TasksList;
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native';
import Task from './Task';
import { ITask } from '@/models/task';

interface Props {
    tasks: ITask[]
}

const TasksList: React.FC<Props> = ({ tasks }) => {
    const [openTaskId, setOpenTaskId] = useState<number | null>(null);
    const [tasksState, setTasksState] = useState<ITask[]>([])

    useEffect(() => {
        setTasksState(tasks)
    }, [tasks])

    return (
        <View className=" bg-transparent gap-y-2 p-2">
            <View className='flex-row items-center'>
                <Text className='text-xl text-blue-800'>Tareas</Text>
                <Text className='text-xl font-semibold text-blue-800'>({tasksState.length})</Text>
            </View>
            <FlatList
                contentContainerStyle={{ paddingBottom: 100 }}
                data={tasksState}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => <Task task={item} />}
            />
        </View >
    )
}
export default TasksList;
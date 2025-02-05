import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native';
import Task from './Task';



const TasksList = () => {
    const [openTaskId, setOpenTaskId] = useState<number | null>(null);

    return (
        <View className=" bg-transparent gap-y-2 p-2">
            <View className='flex-row items-center'>
                <Text className='text-xl text-blue-800'>Tareas</Text>
                <Text className='text-xl font-semibold text-blue-800'>(10)</Text>
            </View>
            <FlatList
                contentContainerStyle={{ paddingBottom: 100 }}
                data={[
                    { key: 'Tarea 1' },
                    { key: 'Tarea 2' },
                    { key: 'Tarea 3' },
                    { key: 'Tarea 4' },
                    { key: 'Tarea 5' },
                    { key: 'Tarea 6' },
                    { key: 'Tarea 7' },
                    { key: 'Tarea 8' },
                    { key: 'Tarea 9' },
                    { key: 'Tarea 10' },
                ]}
                renderItem={({ item }) => <Task />}
            />
        </View >
    )
}
export default TasksList;
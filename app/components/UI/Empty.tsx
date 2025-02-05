import React from 'react'
import { View, Text } from 'react-native'
import EmptyIcon from '@/assets/icons/Empty_file.svg'
const Empty = () => {
    return (
        <View className=' flex-col justify-start items-center bg-blue-100 rounded-full mt-20 px-2'>
            <EmptyIcon width={200} height={200} />
            <Text className='text-xl font-semibold '>No posee tareas activas</Text>
        </View>
    )
}

export default Empty;
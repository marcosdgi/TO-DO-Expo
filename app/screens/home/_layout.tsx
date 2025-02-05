import { IconArrowLeft, IconListDetails, IconNotification } from '@tabler/icons-react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeLayout = () => {
    const insets = useSafeAreaInsets();
    const [haveNotifications, setHaveNotificacions] = useState<boolean>(true);
    return (
        <>
            <StatusBar style='auto' />
            <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
                <Stack>
                    <Stack.Screen name='home' options={{
                        headerTitle: () => {
                            return (
                                <View className='flex-row items-center gap-x-2'>
                                    <IconListDetails color={'blue'} size={25} />
                                    <Text className='text-xl font-semibold text-blue-800'>TO-DO</Text>
                                </View>
                            );
                        },
                        headerTitleAlign: 'center',
                        headerRight: () => {
                            return (
                                <TouchableOpacity className="relative">
                                    <IconNotification color={'blue'} />
                                    {haveNotifications && (
                                        <View className="absolute top-[1px] right-[1px] bg-red-500 rounded-full w-3 h-3" />
                                    )}
                                </TouchableOpacity>
                            );
                        },
                        headerShadowVisible: false,
                    }} />
                    <Stack.Screen name='task' options={{
                        headerShown: false,

                    }} />
                </Stack>
            </View>
        </>
    );
};

export default HomeLayout;

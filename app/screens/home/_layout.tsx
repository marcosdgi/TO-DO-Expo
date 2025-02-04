import { IconListDetails } from '@tabler/icons-react-native';
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const HomeLayout = () => {
    const insets = useSafeAreaInsets();
    return (
        <>
            <StatusBar style='auto' />
            <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
                <Stack>
                    <Stack.Screen name='home' options={{
                        headerShown: false,
                        headerTitle: () => {
                            return (
                                <>
                                    <View>
                                        <IconListDetails color={'yellow'} size={25}/>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Home</Text>
                                    </View>
                                </>
                            )
                        },
                        headerTitleAlign: 'center',
                    }} />
                    
                </Stack>
            </View >
        </>
    )
}

export default HomeLayout;
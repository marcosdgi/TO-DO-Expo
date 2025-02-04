import { useRouter } from "expo-router";
import { useState } from "react";
import { StatusBar, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SplashScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [isCargando, setIsCargando] = useState<boolean>(true);


    if (isCargando) {
        return (
            <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} className="h-full flex flex-col">
                <StatusBar />
                <View className="flex flex-col justify-center items-center h-[100%]">
                    <Text className="text-3xl">TO-DO</Text>
                </View>
            </View>
        );
    }


}
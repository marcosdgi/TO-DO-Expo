import { IconPlus } from "@tabler/icons-react-native";
import { View, Text } from "react-native";


const HomeScreen = () => {
    return (
        <View className="flex-1 flex-col bg-yellow-50">
            <View className="flex-row items-center justify-center w-full">
                <IconPlus size={30} color={'red'} />
                <Text>ToDo</Text>
            </View>
        </View>
    );
}

export default HomeScreen;
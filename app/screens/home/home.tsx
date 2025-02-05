import CreateModalTask from "@/app/components/Home/Modals/CreateModalTask";
import TasksList from "@/app/components/Home/TasksList";
import { IconFilter, IconPlus } from "@tabler/icons-react-native";
import { useState } from "react";
import { View, Pressable, TouchableOpacity } from "react-native";


const HomeScreen = () => {
    const [createModalVisibility, setCreateModalVisibility] = useState<boolean>(false)
    return (
        <View className="flex-1 flex-col bg-transparent p-2 gap-y-4">
            <View className="p-2 flex-row gap-x-2 justify-end items-end">

                <TouchableOpacity
                    focusable
                    className={` 'bg-transparent'}  rounded-md`}
                    onPress={() => setCreateModalVisibility(true)}
                >
                    <IconPlus color={'blue'} size={22} />
                </TouchableOpacity>

                <TouchableOpacity
                >
                    <IconFilter color={'blue'} size={22} />
                </TouchableOpacity>
            </View>

            <View className="w-full mx-auto bg-slate-300 h-[1px] justify-center items-center" />

            <View className="w-full bg-white rounded-md h-auto">
                <TasksList />
            </View>

            {/* Modal para crear una nueva tarea*/}
            <CreateModalTask isOpen={createModalVisibility} onClose={() => {
                setCreateModalVisibility(false)
            }} />
        </View>
    );
}

export default HomeScreen;
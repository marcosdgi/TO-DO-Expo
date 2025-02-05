import CreateModalTask from "@/app/components/Home/Modals/CreateModalTask";
import TasksList from "@/app/components/Home/TasksList";
import Empty from "@/app/components/UI/Empty";
import { ITask } from "@/models/task";
import { TaskRepository } from "@/repository/task/taskRepository";
import { TaskService } from "@/services/taskService";
import { IconFilter, IconPlus } from "@tabler/icons-react-native";
import { useEffect, useState } from "react";
import { View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

const repository = new TaskRepository(process.env.EXPO_PUBLIC_API_URL as string)
const taskService = new TaskService(repository)


const HomeScreen = () => {
    const [createModalVisibility, setCreateModalVisibility] = useState<boolean>(false)
    const [tasks, setTasks] = useState<ITask[]>([])
    const [newTask, setNewTask] = useState<Partial<ITask> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        taskService.getTasks()
            .then((data) => {
                setTasks(data)
            })
            .catch((e) => {
                Alert.alert('Algo ocurrió', "Ocurrió un error durante la carga de los datos, verifique su conexión")
                console.log(e);

            })
            .finally(() => {
                setIsLoading(false)
            }
            )
    }, [newTask])



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

            <View className=" bg-transparent items-center rounded-md h-auto">
                {isLoading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    tasks.length ? (
                        <TasksList tasks={tasks} />
                    ) : (
                        <Empty />
                    )
                )}
            </View>

            {/* Modal para crear una nueva tarea*/}
            <CreateModalTask created={(task) => {
                if (task) {
                    setNewTask(task)
                }
            }} isOpen={createModalVisibility} onClose={() => {
                setCreateModalVisibility(false)
            }} />
        </View>
    );
}

export default HomeScreen;
import CreateModalTask from "@/app/components/Home/Modals/CreateModalTask";
import ModalFilters from "@/app/components/Home/Modals/ModalFilters";
import TasksList from "@/app/components/Home/TasksList";
import Badge from "@/app/components/UI/Badge";
import Empty from "@/app/components/UI/Empty";
import { ITask } from "@/models/task";
import { TaskRepository } from "@/repository/task/taskRepository";
import { TaskService } from "@/services/taskService";
import { IconFilter, IconPlus, IconX } from "@tabler/icons-react-native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

const repository = new TaskRepository(process.env.EXPO_PUBLIC_API_URL as string)
const taskService = new TaskService(repository)


const HomeScreen = () => {
    const [createModalVisibility, setCreateModalVisibility] = useState<boolean>(false)
    const [tasks, setTasks] = useState<ITask[]>([])
    const [newTask, setNewTask] = useState<Partial<ITask> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [changedTaskList, setChangedTaskList] = useState<boolean>(false)
    const [filtering, setFiltering] = useState<boolean>(false)
    const [tagOptions, setTagOptions] = useState<{ value: number, tag: string }[]>([
        { value: 1, tag: 'Completadas' },
        { value: 2, tag: 'Pendientes' },
    ])
    const [currentFilter, setCurrentFilter] = useState<{ value: number, tag: string } | null>(null)
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([])
    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const data = await taskService.getTasks();
            setTasks(data);
            setFilteredTasks(data)
        } catch (e) {
            Alert.alert('Algo ocurrió', "Ocurrió un error durante la carga de los datos, verifique su conexión");
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [newTask]);

    useEffect(() => {
        if (currentFilter) {
            const filteredTasks = tasks.filter((task: ITask) => currentFilter.value === 1 ? task.estado : !task.estado)
            setFilteredTasks(filteredTasks)
        } else {
            setFilteredTasks(tasks)
        }
    }, [currentFilter])


    return (
        <View className="flex-1 flex-col bg-transparent p-2 gap-y-2 mt-2">
            <View className={`px-2 flex-row gap-x-2 w-full  items-center justify-between`}>

                {currentFilter ? (<View className="justify-start">
                    <Badge option={currentFilter} onClose={() => setCurrentFilter(null)} />
                </View>)
                    : <Text>Sin filtros aplicados</Text>
                }


                <View className="flex-row items-center gap-x-2 justify-end">
                    <TouchableOpacity
                        focusable
                        className={` 'bg-transparent'}  rounded-md`}
                        onPress={() => setCreateModalVisibility(true)}
                    >
                        <IconPlus color={'blue'} size={22} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setFiltering(true)
                        }}
                    >
                        <IconFilter color={'blue'} size={22} />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="w-full mt-2 mx-auto bg-slate-300 h-[1px] justify-center items-center" />

            <View className=" bg-transparent items-center rounded-md h-auto">
                {isLoading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    tasks.length && filteredTasks.length ? (
                        <TasksList
                            tasks={filteredTasks}
                            fetchTasks={fetchTasks}
                            deleteFilters={() => setCurrentFilter(null)}
                        />
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
            {/* Modal para filtros */}
            <ModalFilters
                options={tagOptions}
                isOpen={filtering}
                onClose={() => setFiltering(false)}
                onSelect={(option) => setCurrentFilter(option)}
            />
        </View>
    );
}

export default HomeScreen;
import { ITask } from "@/models/task";
import { TaskRepository } from "@/repository/task/taskRepository";

export class TaskService {
    private taskRepository: TaskRepository;

    constructor(taskService: TaskRepository) {
        this.taskRepository = taskService;
    }

    async getTasks(): Promise<ITask[]> {
        return this.taskRepository.getTasks()
    }

    async create(titulo: string, descripcion: string, estado: boolean): Promise<ITask> {
        return this.taskRepository.createTask(titulo, descripcion, estado)
    }

}
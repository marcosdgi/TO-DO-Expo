import { ITask } from "@/models/task";
import { TaskRepository } from "@/repository/task/taskRepository";

export class TaskService {
    private taskRepository: TaskRepository;

    constructor(taskService: TaskRepository) {
        this.taskRepository = taskService;
    }

    async getTasks(): Promise<ITask[]> {
        return await this.taskRepository.getTasks()
    }

    async create(titulo: string, descripcion: string, estado: boolean): Promise<ITask> {
        return await this.taskRepository.createTask(titulo, descripcion, estado)
    }

    async update(titulo: string, descripcion: string, estado: boolean, taskId: number): Promise<ITask> {
        return await this.taskRepository.updateTask(titulo, descripcion, taskId, estado)
    }

    async delete(taskId: number): Promise<ITask> {
        return await this.taskRepository.deleteTask(taskId)
    }

}
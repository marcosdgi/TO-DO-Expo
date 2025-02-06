import { ITask } from "@/models/task";
import { request } from "../request"


export class TaskRepository {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getTasks(): Promise<ITask[]> {
        return request<ITask[]>(`${this.baseUrl}/`, {
            method: "GET"
        })
    }

    async createTask(titulo: string, descripcion: string, estado: boolean): Promise<ITask> {
        return request<ITask>(`${this.baseUrl}/store`, {
            method: "POST",
            body: JSON.stringify({
                titulo,
                descripcion,
                estado
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    async updateTask(titulo: string, descripcion: string, taskId: number, estado: boolean): Promise<ITask> {
        return request<ITask>(`${this.baseUrl}/update/${taskId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                titulo,
                descripcion,
                estado
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    async deleteTask(taskId: number): Promise<ITask> {
        return request<ITask>(`${this.baseUrl}/delete/${taskId}`, {
            method: 'DELETE',
        })
    }
}
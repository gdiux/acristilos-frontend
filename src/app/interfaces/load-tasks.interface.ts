import { Task } from "../models/tasks.model";

export interface LoadTasks{
    ok: boolean,
    tasks: Task[],
    total: number
}
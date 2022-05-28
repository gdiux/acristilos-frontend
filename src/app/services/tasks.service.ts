import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// INTERFACES
import { LoadTasks } from '../interfaces/load-tasks.interface';

// MODEL
import { Task } from '../models/tasks.model';

// ENVIRONMENT
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   GET TOKEN
  ==================================================================== */
  get token():string {
    return localStorage.getItem('token') || '';
  }

  /** ================================================================
   *   GET HEADERS
  ==================================================================== */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /** ================================================================
   *   LOAD TASKS
  ==================================================================== */
  loadTasks(desde: number, limite: number){
    return this.http.get<LoadTasks>(`${base_url}/tasks`, this.headers);
  }

  /** ================================================================
   *   LOAD TASK ID
  ==================================================================== */
  loadTaskId(id:string){
    return this.http.get<{ok: boolean, task: Task}>(`${base_url}/tasks/${id}`, this.headers);
  }

  /** ================================================================
   *   CREATE TASKS
  ==================================================================== */
  createTask( formaData: any ){
    return this.http.post<{ task: Task, ok: boolean }>(`${base_url}/tasks`, formaData, this.headers);
  }

  /** ================================================================
   *   PUT TASKS
  ==================================================================== */
  putTask( formData: any, id: string ){
    return this.http.put<{ task: Task, ok: boolean }>(`${base_url}/tasks/${id}`, formData, this.headers);
  }

  // FIN DE LA CLASE
}

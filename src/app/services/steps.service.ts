import { Injectable } from '@angular/core';

// INTERFACES

// MODEL
import { Step } from '../models/steps.model';

// ENVIRONMENT
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class StepsService {

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
   *   LOAD STEPS
  ==================================================================== */
  loadStepTask(task: string){
    return this.http.get<{ok: boolean, steps: Step[]}>(`${base_url}/steps/task/${task}`, this.headers);
  }

  /** ================================================================
   *   CREATE STEPS
  ==================================================================== */
  createStep( formaData: any ){
    return this.http.post<{ step: Step, ok: boolean }>(`${base_url}/steps`, formaData, this.headers);
  }

  /** ================================================================
   *   PUT STEPS
  ==================================================================== */
  putStep( formData: any, id: string ){
    return this.http.put<{ task: Task, ok: boolean }>(`${base_url}/steps/${id}`, formData, this.headers);
  }


  // FIN DE LA CLASE
}

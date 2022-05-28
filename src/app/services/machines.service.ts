import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

// INTERFACES
import { LoadMachines } from '../interfaces/load-machines.interface';

// ENVIRONMENT
import { environment } from '../../environments/environment';
import { Machine } from '../models/machines.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

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
   *   LOAD MACHINES
  ==================================================================== */
  loadMachines(desde: number, limite: number){
    return this.http.get<LoadMachines>(`${base_url}/machines`, this.headers);
  }

  /** ================================================================
   *   CREATE MACHINE
  ==================================================================== */
  createMachine( formaData: any ){
    return this.http.post<{ machine: Machine, ok: boolean }>(`${base_url}/machines`, formaData, this.headers);
  }

  /** ================================================================
   *   PUT MACHINE
  ==================================================================== */
  putMachine( formData: any, id: string ){
    return this.http.put<{ machine: Machine, ok: boolean }>(`${base_url}/machines/${id}`, formData, this.headers);
  }


  // FIN DE LA CLASE
}

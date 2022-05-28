import { Machine } from '../models/machines.model';

export interface LoadMachines{
    ok: boolean,
    machines: Machine[],
    total: number
}
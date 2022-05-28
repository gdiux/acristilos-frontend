import { Machine } from "./machines.model";

export class Step{
    constructor(

        public staff: any,
        public end: Date,
        public description: string,
        public notes: any[],
        public attachments: any[],
        public machine: Machine,
        public task: any,
        public estado: string,
        public status: boolean,
        public fecha: Date,
        public stid: string

    ){}
}
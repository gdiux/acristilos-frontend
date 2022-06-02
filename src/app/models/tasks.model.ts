export class Task{

    constructor(
        public client: any,
        public control?: number,
        public create?: any,
        public products?: any[],
        public type?: string,
        public description?: string,
        public estado?: string,
        public status?: boolean,
        public fecha?: Date,
        public tid?: string,
    ){}

}
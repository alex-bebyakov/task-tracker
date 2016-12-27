export class Task {
    id:string
    title: string;
    description: string;
    executor: string;
    status: string;
    priority: number;
    finish:Date;
    start:Date;
    completed:Date;
    createdAt: Date;
    constructor() {
        this.title=''

    }
}

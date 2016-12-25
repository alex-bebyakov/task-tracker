export interface ITask {
   title?: string;
   description?: string;
   status?:string;
   priority?:number;
   finish?:Date;
   start?:Date;
   completed?:Date;
   _executor?:number
}

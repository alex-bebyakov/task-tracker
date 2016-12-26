import {Document, Schema, Model, model} from "mongoose";
import {ITask} from "../interfaces/task";

export interface ITaskModel extends ITask, Document {
    executor(): any;
}

export var TaskSchema: Schema = new Schema({
    _executor:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        unique:true
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum: ['todo','inprogress','completed'],
        lowercase:true,
    },
    priority:{
        type:Number,
        enum: [0,1,2],
        required:true
    },
    finish:{
        type:Date,
        required:true,
    },
    start:{
        type:Date,
    },
    completed:{
        type:Date,
        required:true,
    },
    createdAt: Date
});
TaskSchema.pre("save", next => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

TaskSchema.methods.executor = function (): any {
    return this._executor;
};

export const Task: Model<ITaskModel> = model<ITaskModel>("Task", TaskSchema);

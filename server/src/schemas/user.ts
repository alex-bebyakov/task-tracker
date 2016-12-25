import {Document, Schema, Model, model} from "mongoose";
import {IUser} from "../interfaces/user";

export interface IUserModel extends IUser, Document {
    name(): any;
}

export var UserSchema: Schema = new Schema({
    createdAt: Date,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});
UserSchema.pre("save", next => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
UserSchema.methods.name = function (): any {
    return (this.username.trim());
};



export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
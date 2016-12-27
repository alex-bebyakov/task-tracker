import {User, IUserModel} from "../schemas/user";

var mongoose = require('mongoose');
mongoose.Promise  = require('bluebird');

export default {
    createUser,
    updateUser,
    findUser,
    findUsers
}



function findUsers(): Promise<IUserModel[]> {
    return User.find({}).exec()
}

function createUser(username,password): Promise<IUserModel> {
    return new User({
        username: username,
        password: password,
    }).save();
}

function findUser(username): Promise<IUserModel> {
    return User.findOne({username:username}).exec()
}

function updateUser(user): Promise<IUserModel> {
    return user.save();
}

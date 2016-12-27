import {Task, ITaskModel} from "../schemas/task";

var mongoose = require('mongoose');
mongoose.Promise  = require('bluebird');

export default {
    createTask,
    updateTask,
    findTasksByExecutor,
    findTaskByTitle
}

function createTask(task,executor,): Promise<ITaskModel> {
    let now = new Date();
    return new Task({
        _executor: executor,
        title: task.title,
        description: task.description,
        priority: task.priority,
        finish: task.finish,
        createdAt: now,
        start: now,
        completed: task.finish,
        status: 'todo'
    }).save();
}

function updateTask(task): Promise<ITaskModel> {
    return task.save()
}

function findTasksByExecutor(executor): Promise<ITaskModel[]> {
    return Task.find({_executor: executor})
        .populate('_executor')
        .exec()
}

function findTaskByTitle(executor,title): Promise<ITaskModel> {
    return Task.findOne({_executor: executor,title:title})
        .populate('_executor')
        .exec()
}




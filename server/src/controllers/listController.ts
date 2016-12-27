import userRepository from "../repositories/userRepository";
import taskRepository from "../repositories/taskRepository";
export default {
    getExecutors,
    createTask,
    updateTask

};

function getExecutors(req,res,next) {
    return  userRepository.findUsers()
        .then(users=>{
            let usernames = [];
            users.forEach(function (user) {
                usernames.push(user.username);
            });
            return res.send(usernames);
        })
        .catch(err=>next(err))
}

function createTask (req,res,next) {
    return userRepository.findUser(req.body.task.executor)
        .then((user)=>{
            return userRepository.updateUser(user)
                .then(user=>{
                    return taskRepository.createTask(req.body.task,user._id)
                        .then(()=>res.status(200).send({message: 'taskCreate'}))
                        .catch(err=>next(err))
                })
                .catch(err=>next(err))
        })
        .catch(err=>next(err))
}

function updateTask (req,res,next) {
    return userRepository.findUser(req.body.task.executor)
        .then((executor)=>{
            executor!=null
                ?taskRepository.findTaskByTitle(executor._id,req.body.task.title)
                .then((task)=>{
                    let status=req.body.task.status
                    if(status=='inprogress'){
                        status='completed'
                        task.completed=new Date()
                    }else{
                        status='inprogress'
                        task.start=new Date()
                    }
                    task.status=status
                    task.priority=req.body.task.priority
                    task.finish=req.body.task.finish
                    task.description=req.body.task.description
                    task.title=req.body.task.title
                    return taskRepository.updateTask(task)
                        .then(res.status(200).send({message: 'taskUpdate'}))
                        .catch((err)=>next(err))
                })
                .catch((err)=>next(err))
                :res.redirect('/login');
        })
        .catch((err)=>next(err))
}



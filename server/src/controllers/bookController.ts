import taskRepository from "../repositories/taskRepository";
import userRepository from "../repositories/userRepository";

export default {
    getTasks

};

function getTasks(req, res, next){
    return  userRepository.findUser(req.body.username)
        .then((executor)=>{
            executor!=null
                ?taskRepository.findTasksByExecutor(executor._id)
                .then((tasks)=>res.send(tasks))
                .catch((err)=>next(err))
                :res.redirect('/login');
        })
        .catch((err)=>next(err))
}


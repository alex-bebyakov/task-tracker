import userRepository from "../repositories/userRepository";

export default {
    logIn,
    signUp

};

function logIn(req, res, next,passport){
   return passport.authenticate('local',
        (err, user, info) => {
            return err
                ? next(err)
                : user
                ? req.logIn(user, (err) => {
                return err
                    ? next(err)
                    : res.status(200).send({token: 'userLogIn'});
            })
                : res.status(200).send(info);
        }
    )
}

function signUp(req, res, next){
    return userRepository.createUser(req.body.username,req.body.password)
        .then((user)=>{
            req.logIn(user, (err) => {
                return err
                    ? next(err)
                    : res.status(200).send({token: 'userLogIn'});
            });
        })
        .catch(err=>next(err))
}



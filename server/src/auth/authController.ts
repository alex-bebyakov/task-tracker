import {Strategy as LocalStrategy} from 'passport-local';
import {User} from "../schemas/user";


export default function init(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(username, password,done){
        User.findOne({ username : username},(err,user)=>{
            return err
                ? done(err)
                : user
                ? password === user.password
                ? done(null, user)
                : done(null, false, { message: 'Incorrect password.' })
                : done(null, false, { message: 'Incorrect username.' });
        });
    }));
}




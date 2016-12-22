import {User} from "../schemas/user";

import {Strategy as LocalStrategy} from 'passport-local';


export default function init(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            console.log(username)
            return err
                ? done(err)
                : user
                ? password === user.password
                ? done(null, user)
                : done(null, false, {message: 'Incorrect password.'})
                : done(null, false, {message: 'Incorrect username.'});
        });
    }));
}




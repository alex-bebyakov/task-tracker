import authControllerInit from './authController';
import {User} from "../schemas/user";

export default initPassport;

function initPassport(passport) {
    authControllerInit(passport);

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });
}
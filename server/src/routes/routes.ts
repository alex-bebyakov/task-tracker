import authControllerInit from '../auth/authController';
import {User} from "../schemas/user";

export default {
    init: initRoutes
};


function initRoutes(app, passport) {
    initAuthRoutes(app, passport);
}

function initAuthRoutes(app, passport) {
    authControllerInit(passport);
    app.post('/login', (req, res, next) => {
        passport.authenticate('local',
            function (err, user, info) {
                console.log(err)
                console.log(user)
                console.log(info)
                return err
                    ? next(err)
                    : user
                    ? req.logIn(user, function (err) {
                    return err
                        ? next(err)
                        : res.status(200).send({token: 'userLogIn'});
                })
                    : res.status(200).send(info);
            }
        )(req, res, next);
    })

    app.post('/signup', (req, res, next) => {
        var user = new User({username: req.body.username, password: req.body.password});
        user.save((err) => {
            return err
                ? next(err)
                : req.logIn(user, (err) => {
                return err
                    ? next(err)
                    : res.status(200).send({token: 'userLogIn'});
            });
        });
    })

    app.all('', (req, res, next) => {
        req.isAuthenticated()
            ? next()
            : res.redirect('/login');
    })
    app.all('/*', (req, res, next) => {
        req.isAuthenticated()
            ? next()
            : res.redirect('/login');
    })
}
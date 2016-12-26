import authControllerInit from '../auth/authController';
import {User} from "../schemas/user";
import {Task} from "../schemas/task";

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
        )(req, res, next);
    })

    app.post('/signup', (req, res, next) => {
        var user = new User({
            username: req.body.username,
            password: req.body.password,
        });
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

    app.get('/users', (req, res, next) => {
        User.find({}, function (err, users) {
            var usernames = [];
            users.forEach(function (user) {
                usernames.push(user.username);
            });
            res.send(usernames);
        });
    })

    app.post('/tasks', (req, res, next) => {
        User.findOne({username: req.body.username}, function (err, user) {
            return err
                ? next(err)
                : user!=null
                ? Task.find({_executor: user._id}).populate('_executor')
                .exec(function (err, tasks) {
                    return err
                        ? next(err)
                        : res.send(tasks);
                })
                :res.redirect('/login');
        })
    })


    app.post('/newtask', (req, res, next) => {

       User.findOne({username: req.body.task.executor}, function (err, user) {
            let now = new Date();
            var task = new Task({
                _executor: user._id,
                title: req.body.task.title,
                description: req.body.task.description,
                priority: req.body.task.priority,
                finish: req.body.task.finish,
                createdAt: now,
                start: now,
                completed: req.body.task.finish,
                status: 'todo'
            });
            return err
                ? next(err)
                : user.save((err) => {
                return err
                    ? next(err)
                    : task.save((err) => {
                    return err
                        ? next(err)
                        : res.status(200).send({message: 'taskCreate'});
                });
            });
        });


    })

    app.post('/refresh', (req, res, next) => {

        User.findOne({username: req.body.task.executor}, function (err, user) {
            return err
                ? next(err)
                : user!=null
                ? Task.findOne({_executor: user._id,title:req.body.task.title}).populate('_executor')
                .exec(function (err, task) {
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
                    task.save(res.status(200).send({message: 'taskUpdate'}))

                })
                :res.redirect('/login');
        })




    })

    app.get('/logout', function(req, res){
        req.logout();
        res.status(200).send({});
     });

    app.all('/', (req, res, next) => {
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
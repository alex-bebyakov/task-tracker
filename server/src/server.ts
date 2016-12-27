import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';

import config from './config';
import pathHelper from './helpers/pathHelper';
import routes from './routes/routes';
import logger from './logger';
import auth from './auth/authInit';

const app = express();

export default {
    start
};

function start(options: any) {
    initExpress();

    const passport = require('passport');

    const mongo_uri = process.env['MONGODB_URI']||config.db.host
    mongoose.connect(mongo_uri);

    routes.init(app, passport);

    initErrorHandling(app);

    const port=process.env.PORT || config.web.port
    app.listen(port, function () {
        console.log(`Server is listening on port ${port}!`);
    });
}

function initExpress() {
    if (config.app.isDevLocal){
        app.use(morgan('dev'));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(config.api.a, express.static(pathHelper.getRelative(config.res)));
    app.use(config.api.b, express.static(pathHelper.getRelative(config.res)));
    app.use(config.api.c, express.static(pathHelper.getRelative(config.res)));
    app.use(config.api.d, express.static(pathHelper.getRelative(config.res)));
    app.use(config.api.e, express.static(pathHelper.getRelative(config.res)));
    app.use(config.api.f, express.static(pathHelper.getRelative(config.res)));
    app.use(config.api.g, express.static(pathHelper.getRelative(config.res)));
    app.use(config.api.h, express.static(pathHelper.getRelative(config.res)));
    app.use(compression());
    if (config.app.isDevLocal) {
        app.use(cors());
    }

    initSession();

    initAuth();
}

function initAuth() {
    const passport = require('passport');
    auth(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    return passport;
}

function initSession() {
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());
    const session = require('cookie-session');
    app.use(session({
        secret: config.web.sessionSecret
    }));
}

function initErrorHandling(app: express.Application) {
    (app as any).use(function (err, req, res, next) {
        logger.error(err);
        console.log(err);
        let message = _.isError(err) ? err.message : err;
        message = config.app.isDevLocal ? message : 'Server Error';
        res.status(500).send({error: message});
    });
    process.on('uncaughtException', function (err) {
        logger.error(err);
    });
}
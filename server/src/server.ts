import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as _ from 'lodash';

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

    routes.init(app, passport);

    initErrorHandling(app);

    app.listen(config.web.port, function () {
        console.log(`Server is listening on port ${config.web.port}!`);
    });
}

function initExpress() {
    if (config.app.isDevLocal) app.use(morgan('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/', express.static(pathHelper.getRelative('../client/public')));

    app.use(compression());

    if (config.app.isDevLocal) app.use(cors());

    initSession();

    initAuth();
}

function initAuth() {
    const flash = require('connect-flash');
    app.use(flash());
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
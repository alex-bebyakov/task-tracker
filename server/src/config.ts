import pathHelper from './helpers/pathHelper';

interface IConfigValues {
    app: {
        appName: string,
        isDevLocal: boolean,
        logErrors: boolean,
        rootUrl: string
    },
    db: {
        host: string,
        dbName: string,
        username: string,
        password: string
    },
    web: {
        port: number,
        sessionSecret: string
    },
    email: {
        fromNoReply: string
    },
    auth: {
        useAuth: boolean
    },
    format: {
        date: string,
        year: string,
        currencySymbol: string
    }
}

let configValues = <IConfigValues>{};

ensureConfigPath();

const configReader = require('config');

loadConfig();

export function loadConfig() {

    (<any>configValues).app = {};
    configValues.app.appName = get('app.appName');
    configValues.app.isDevLocal = get('app.isDevLocal');
    configValues.app.logErrors = get('app.logErrors');
    configValues.app.rootUrl = get('app.rootUrl');

    (<any>configValues).web = {};
    configValues.web.port = get('web.port');
    configValues.web.sessionSecret = get('web.sessionSecret');

    (<any>configValues).email = {};
    configValues.email.fromNoReply = get('email.fromNoReply');

    (<any>configValues).auth = {};
    configValues.auth.useAuth = get('auth.useAuth');

    (<any>configValues).format = {};
    configValues.format.date = get('format.date');
    configValues.format.year = get('format.year');
    configValues.format.currencySymbol = get('format.currencySymbol');
}

function get(key) {
    return configReader.get(key);
}

function ensureConfigPath() {
    if (!process.env['NODE_CONFIG_DIR']) {
        let configPath = pathHelper.getDataRelative('/');
        process.env['NODE_CONFIG_DIR'] = configPath;
    }
}

export default configValues;
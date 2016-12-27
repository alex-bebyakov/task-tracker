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
    res:string,
    api:{
        a: string
        b: string
        c: string
        d: string
        e: string
        f: string
        g: string
        h: string
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

    (<any>configValues).db = {};
    configValues.db.host = get('db.host');

    (<any>configValues).format = {};
    configValues.format.date = get('format.date');
    configValues.format.year = get('format.year');
    configValues.format.currencySymbol = get('format.currencySymbol');

    (<any>configValues).res ="";
    configValues.res=get('res');

    (<any>configValues).api = {};
    configValues.api.a = get('api.a');
    configValues.api.b = get('api.b');
    configValues.api.c = get('api.c');
    configValues.api.d = get('api.d');
    configValues.api.e = get('api.e');
    configValues.api.f = get('api.f');
    configValues.api.g = get('api.g');
    configValues.api.h = get('api.h');
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
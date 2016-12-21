import * as _ from 'lodash';
import config from '../config';
let app = null;
let passport = null;

export default init;

function init(expressApp, passportAuth) {
    app = expressApp;
    passport = passportAuth;
    return {
        app,
        get: httpGet,
        post: httpPost,
        put: httpPut,
        delete: httpDelete
    };
}


function httpGet(path, handler) {
    const args = getRouteArguments(path, handler);
    app.get.apply(app, args);
}

function httpPost(path, handler) {
    const args = getRouteArguments(path, handler);
    app.post.apply(app, args);
}

function httpPut(path, handler) {
    const args = getRouteArguments(path, handler);
    app.put.apply(app, args);
}

function httpDelete(path, handler) {
    const args = getRouteArguments(path, handler);
    app.delete.apply(app, args);
}

function getRouteArguments(path, handler) {
    let result = [];
    result.push(path);
    result.push(handler);
    return result;
}

import authControllerInit from '../auth/authController';
import helperInit from './routesHelper';

export default {
    init: initRoutes
};

let helper = helperInit(null, null);

function initRoutes(app, passport) {
    helper = helperInit(app, passport);
    initAuthRoutes(passport);
}

function initAuthRoutes(passport) {
    let authController = authControllerInit(passport);
    //helper.post('/login', authController.logIn);
   // helper.post('/signup', authController.signUp);
  //  helper.get('/logout', authController.logOut);
}
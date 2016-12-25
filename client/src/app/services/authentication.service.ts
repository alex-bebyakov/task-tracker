//take from https://github.com/cornflourblue/angular2-jwt-authentication-example.git

import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";


@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {

    }

    in(username: string, password: string, isSignUp: boolean): Observable<number> {
        var jsonHeaders = new Headers();
        let path = '/login'
        if (isSignUp) {
            path = '/signup'
        }
        jsonHeaders.append('Content-Type', 'application/json');
        return this.http.post(path, {username: username, password: password}, {headers: jsonHeaders})
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    localStorage.setItem('currentUser', JSON.stringify({
                        username: username,
                        token: token
                    }));
                    return 0;
                } else {
                    if (response.json() && response.json().message == 'Incorrect password.') {
                        return 1;
                    } else if (response.json() && response.json().message == 'Incorrect username.') {
                        return 2
                    } else {
                        return -1;
                    }
                }
            });
    }

    out(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}

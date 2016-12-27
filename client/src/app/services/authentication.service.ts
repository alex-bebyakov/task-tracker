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

    out(): Observable<boolean>  {
        this.token = null;
        localStorage.removeItem('currentUser');

        return this.http.get('/logout')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

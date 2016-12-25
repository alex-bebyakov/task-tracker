
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {Task} from "../models/task";

@Injectable()
export class TrackerService {

    constructor(private http: Http) {

    }

    users(): Observable<Array<string>> {
        return this.http.get('/users')
            .map(this.extractData)
            .catch(this.handleError);
    }

    tasks(): Observable<Array<any>> {
        let jsonHeaders = new Headers();
        jsonHeaders.append('Content-Type', 'application/json');
        let username=JSON.parse(localStorage.getItem("currentUser")).username
        return this.http.post('/tasks',{username:username}, {headers: jsonHeaders})
            .map(this.extractData)
            .catch(this.handleError);
    }
    create(task: Task):Observable<boolean>{
        let jsonHeaders = new Headers();
        jsonHeaders.append('Content-Type', 'application/json');

        return this.http.post('/newtask',{task:task}, {headers: jsonHeaders}).map((response: Response) => {
            let message = response.json() && response.json().message;
            if(message=='taskCreate'){
                return true;
            }
            return false;
        })
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError (error: Response | any) {
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
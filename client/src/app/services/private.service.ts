import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {Task} from "../models/task";
declare var tempus: any
declare var _: any
@Injectable()
export class PrivateService {
    private task: Task = new Task()
    private username: ''

    constructor(private http: Http) {
        this.username = JSON.parse(localStorage.getItem("currentUser")).username
    }

    init(task: Task) {

        this.task = task;
        this.task.executor = this.username;
    }

    getTask() {
        return this.task
    }

    setTask(task: any, status: string) {
        this.task.status = status;
        this.task.priority = task['priority']
        this.task.completed = task['completed']
        this.task.createdAt = task['start']
        this.task.description = task['description']
        this.task.title = task['title']
        this.task.executor = this.username
        this.task.finish = task['finish'];
   }

    getStatus() {
        let result = 'Новая'
        if (this.task.status == 'inprogress') {
            result='В работе'
        }
        else if(this.task.status == 'completed'){
            result='Завершено'
        }
        return result
    }

    users(): Observable<Array<string>> {
        return this.http.get('/users')
            .map(this.extractData)
            .catch(this.handleError);
    }

    tasks(): Observable<Array<any>> {
        let jsonHeaders = new Headers();
        jsonHeaders.append('Content-Type', 'application/json');
        return this.http.post('/tasks', {username: this.username}, {headers: jsonHeaders})
            .map(this.extractData)
            .catch(this.handleError);
    }

    update(task: Task,isCreate:boolean): Observable<boolean> {
        let jsonHeaders = new Headers();
        jsonHeaders.append('Content-Type', 'application/json');
        let path='/newtask'
        this.task=task
        if(!isCreate){
            path='/refresh'
        }
        return this.http.post(path, {task: this.task}, {headers: jsonHeaders}).map((response: Response) => {
            let message = response.json() && response.json().message;
            if (message == 'taskUpdate'||message == 'taskCreate') {
                return true;
            }
            return false;
        })
    }


    checkDate(date: Date): boolean {
        if (tempus(new Date()).between(tempus(date), 'day') < 0) {
            return false
        }
        else {
            return true;
        }
    }

    elapsed(before: Date, after: Date, format: string) {
        if(format=='minutes'){
            return tempus(before).between(tempus(after), format)-tempus(before).between(tempus(after), 'hours')*60;
        }
        else if(format=='hours'){
            return tempus(before).between(tempus(after), format);
        }
        else if(format=='days'){
            return tempus(before).between(tempus(after), 'day');
        }

    }

    formatDate(date, formatLine): any {
        return tempus(date).format(formatLine);
    }

    getColor(priority) {
        let color = "yellow"
        if (priority == 0) {
            color = "lightpink"
        } else if (priority == 1) {
            color = "skyblue"
        } else if (priority == 2) {
            color = "lightgreen"
        }
        return color
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
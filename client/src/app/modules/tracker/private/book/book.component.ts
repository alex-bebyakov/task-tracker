import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {PrivateService} from "../../../../services/private.service";
import {Task} from "../../../../models/task";

declare var _:any

@Component({
    selector: 'book',
    templateUrl: 'book.component.html',
    styleUrls: ['book.component.scss','../private.component.scss'],

})

export class BookComponent implements OnInit {
    bookOfTasks=[]
    STATES=['todo','inprogress','completed']
    constructor(private tasksService: PrivateService, public router: Router) {

    }

    ngOnInit() {

        for(let i=0;i<this.STATES.length;i++){
            this.bookOfTasks[this.STATES[i]]=[]
        }
        this.tasksService.tasks().subscribe(results=>{
            results.forEach(data=>{
                let now=new Date()
                let create=new Date(data.createdAt)
                let start=new Date(data.start)
                let end=new Date(data.finish)
                let completed=new Date(data.completed)
                let result={}
                result['progress']=(+now-+create)/(+end-+create)*100
                result['finish']= this.tasksService.formatDate(end,'%Y-%m-%d')
                result['title']=data.title
                result['description']=data.description
                result['priority']=data.priority
                if(data.status=='inprogress'){
                    result['elapsed_h']=this.tasksService.elapsed(start,now,'hours')
                    result['elapsed_min']=this.tasksService.elapsed(start,now,'minutes')
                }
                else if(data.status=='completed'){
                    result['elapsed_h']=this.tasksService.elapsed(start,completed,'hours')
                    result['elapsed_min']=this.tasksService.elapsed(start,completed,'minutes')
                }
                result['start']=this.tasksService.formatDate(start,'%d-%m-%Y %H:%M')
                result['completed']=this.tasksService.formatDate(completed,'%d-%m-%Y %H:%M')
                this.bookOfTasks[data.status].push(result)
            })
            let path=location.pathname.substring(1)
            if(path){
                this.sortByPath(path)
            }



        })
    }

    getColor(priority){
        return this.tasksService.getColor(priority)
    }

    private sortByPath(path){
        for(let i=0;i<this.STATES.length;i++){
            this.bookOfTasks[this.STATES[i]]=_.sortBy(this.bookOfTasks[this.STATES[i]],[path])

        }


        }

    goTask(task:any,status:string){
        this.tasksService.setTask(task,status)
        this.router.navigate(['./update'])
    }
}
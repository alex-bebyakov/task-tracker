import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {PrivateService} from "../../../../services/private.service";

declare var _:any

@Component({
    selector: 'book',
    templateUrl: 'book.component.html',
    styleUrls: ['book.component.scss','../private.component.scss'],

})

export class BookComponent implements OnInit {
    bookOfTasks=[]
    STATES=['todo','inprogress','completed']
    loading:boolean
    constructor(private tasksService: PrivateService, public router: Router) {

    }

    ngOnInit() {
        this.loading=true
        for(let i=0;i<this.STATES.length;i++){
            this.bookOfTasks[this.STATES[i]]=[]
        }
        this.tasksService.tasks().subscribe(results=>{
            results.forEach(data=>{
                this.bookOfTasks[data.status].push(this.getOutData(data))
            })
            let path=location.pathname.substring(1)
            if(path){
                this.sortByPath(path)
            }
            this.loading=false
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

    private getOutData(data){
        let now=new Date()
        let create=new Date(data.createdAt)
        let start=new Date(data.start)
        let end=new Date(data.finish)
        let completed=new Date(data.completed)
        let result={}
        let delta=+end-+create
        let progress=0
        if(delta<0){
            progress=100
        }
        else{
            progress=(+now-+create)/delta*100
        }
        result['progress']=progress
        result['finish']= this.tasksService.formatDate(end,'%Y-%m-%d')
        result['_id']=data._id
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
        return result
    }

    goTask(task:any,status:string){
        this.tasksService.setTask(task,status)
        this.router.navigate(['./update'])
    }
}

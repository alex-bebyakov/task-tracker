import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {TrackerService} from "../../../../services/tracker.service";

declare var tempus:any
declare var _:any
@Component({
    selector: 'book',
    templateUrl: 'book.component.html',
    styleUrls: ['book.component.scss','../home.component.scss'],

})

export class BookComponent implements OnInit {
    bookOfTasks=[]

    constructor(public bookService: TrackerService, public router: Router) {
        let path=location
        this.bookOfTasks['todo']=[]
        this.bookOfTasks['inprogress']=[]
        this.bookOfTasks['completed']=[]
       bookService.tasks().subscribe(results=>{
           results.forEach(data=>{
               let now=new Date()
               let create=new Date(data.createdAt)
               let start=new Date(data.start)
               let end=new Date(data.finish)
               let completed=new Date(data.completed)
               let result={}
               result['progress']=(+now-+create)/(+end-+create)*100
               result['finish']= tempus(end).format('%Y-%m-%d')
               result['title']=data.title
               result['priority']=data.priority
               if(data.status=='inprogress'){
                   result['elapsed_h']=tempus(start).between(tempus(now), 'hours');
                   result['elapsed_min']=tempus(start).between(tempus(now), 'minutes')-result['elapsed_h']*60
               }
               else if(data.status=='completed'){
                   result['elapsed_min']=tempus(start).between(tempus(completed), 'minutes');
                   result['elapsed_h']=tempus(start).between(tempus(completed), 'hours');
               }
               result['start']=tempus(start).format('%d-%m-%Y %H:%M')
               result['completed']=tempus(completed).format('%d-%m-%Y %H:%M')
               this.bookOfTasks[data.status].push(result)
           })
           let path=location.pathname.substring(1)
           if(path){
               console.log(path)
               this.sortByPath(path)
           }


       })
    }

    ngOnInit() {

    }


    getColor(priority){
        let color="yellow"
        if (priority==0){
            color="lightpink"
        }else if(priority==1){
            color="skyblue"
        }else if(priority==2){
            color="lightgreen"
        }
        return color
    }

    private sortByPath(path){
        this.bookOfTasks['todo']=_.sortBy(this.bookOfTasks['todo'],[path])
        this.bookOfTasks['inprogress']=_.sortBy(this.bookOfTasks['inprogress'],[path])
        this.bookOfTasks['completed']=_.sortBy(this.bookOfTasks['completed'],[path])
        if(path=='finish'){
            this.bookOfTasks['todo'].forEach(list=>{
                list['finish']= tempus(list['finish']).format('%d-%m-%Y')
            })
        }

    }
}

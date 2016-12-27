import {Component, OnInit} from "@angular/core";
import {PrivateService} from "../../../../services/private.service";
import {Task} from "../../../../models/task";
import {Router} from "@angular/router";


@Component({
    selector: 'list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss','../private.component.scss'],

})

export class ListComponent implements OnInit {
    task: Task = new Task();
    users:any=[]
    error = '';
    isCreate:boolean=false
    status=''
    priority=''
    btnCaption=''
    estimate:any
    constructor(private updateTaskService: PrivateService, public router: Router) {
        let path=location.pathname.substring(1)
        if(path=='create'){
            this. isCreate=true;
        }
    }

    ngOnInit() {
        if(this.isCreate){
            this.updateTaskService.executors().subscribe(result => {
                this.users=result;
            })
        }else{
            this.task=this.updateTaskService.getTask()
            this.status=this.updateTaskService.getStatus()
            this.priority=this.updateTaskService.getPriority()
            this.btnCaption=this.updateTaskService.getBtnCaption()
            let now=new Date()
            let end=new Date(this.task.finish)
            this.estimate=this.updateTaskService.elapsed(now,end,'days')
            if(this.task.title==''){
                this.router.navigate(['/']);
            }

        }
  }

    update(){
        this.updateTaskService.update(this.task,this.isCreate).subscribe(result => {
            if(result){
                this.router.navigate(['/']);

            }else{
                if(!this.isCreate){
                    this.error="Не удалось обновить задание."
                }
                else{
                    this.error="Не удалось создать задание."
                }
            }
        })
    }

    readOnly(){
        if(!this.isCreate){
            return this.task.status=='inprogress'
        }
        return false
    }

    getMargin(status){
        let result="-30px"
        if (this.task.status == 'inprogress') {
            result='25px'
        }
        else if(this.task.status == 'completed'){
            result='-65px'
        }
        return result
    }
 }

import {Component, OnInit} from "@angular/core";
import {TrackerService} from "../../../../services/tracker.service";
import {Task} from "../../../../models/task";
import {Router} from "@angular/router";


@Component({
    selector: 'order',
    templateUrl: 'order.component.html',
    styleUrls: ['order.component.scss','../home.component.scss'],

})

export class OrderComponent implements OnInit {
    task: Task = new Task;
    users:any=[]
    error = '';
    constructor(public orderService: TrackerService, public router: Router) {
        orderService.users().subscribe(result => {
            this.users=result;
        })
    }

    ngOnInit() {


    }

    create(){
        this.orderService.create(this.task).subscribe(result => {
            if(result){
                this.router.navigate(['/']);
            }else{
                this.error="Не удалось создать задание."
            }
        })
    }

 }

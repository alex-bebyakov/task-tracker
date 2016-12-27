import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {PrivateService} from "../../../services/private.service";


@Component({
    selector: 'private',
    templateUrl: 'private.component.html',
    styleUrls: ['private.component.scss'],

})

export class PrivateComponent implements OnInit, OnDestroy{

    constructor(public router: Router,private privateService: PrivateService) {

    }

    ngOnInit() {
        let username = JSON.parse(localStorage.getItem("currentUser")).username
        this.privateService.setUsername(username)

    }

    ngOnDestroy(){
        localStorage.removeItem('currentUser');
}


}

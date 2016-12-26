import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";


@Component({
    selector: 'private',
    templateUrl: 'private.component.html',
    styleUrls: ['private.component.scss'],

})

export class PrivateComponent implements OnInit {

    constructor(public router: Router) {

    }

    ngOnInit() {


    }

    logout(){
        window.location.href='http://'+location.host+'/login'
    }

}

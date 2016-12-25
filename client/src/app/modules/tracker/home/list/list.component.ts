import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";


@Component({
    selector: 'list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss'],

})

export class ListComponent implements OnInit {

    constructor(public router: Router) {

    }

    ngOnInit() {


    }

}

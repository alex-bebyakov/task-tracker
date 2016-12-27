import {Component, OnInit} from "@angular/core";
import {PrivateService} from "../../services/private.service";
import {Observable} from "rxjs";

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    username: Observable<string> = new Observable<string>();

    constructor(private privateService: PrivateService) {
    }

    ngOnInit() {
        this.username=this.privateService.getUsername().map(result=>{
            return result
        }).publishReplay(1)
            .refCount();
    }

}

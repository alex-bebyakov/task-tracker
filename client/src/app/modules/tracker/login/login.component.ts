import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {Response} from "@angular/http";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],

})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    isSignUp: boolean = false
    constructor(public authenticationService: AuthenticationService, public router: Router) {

    }

    ngOnInit() {
        this.authenticationService.out().subscribe()

    }

    login() {
        this.loading = true;
        this.authenticationService.in(this.model.username, this.model.password, this.isSignUp)
            .subscribe(result => {
                if (result === 0) {
                    this.router.navigate(['/']);
                } else if (result === -1) {
                    this.error = 'Отказано в доступе.';
                    this.loading = false;
                }
                else {
                    if (result === 1) {
                        this.error = 'Неправильный пароль.';
                    }
                    else if (result == 2) {
                        this.error = 'Нет такого пользователя.';
                    }
                    this.loading = false;
                }
            });
    }

    signUp(signUp: boolean) {
        this.isSignUp = signUp;
        this.error = ''
        this.model= {};
    }
}

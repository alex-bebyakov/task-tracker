import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrackerComponent} from "./tracker.component";
import {trackerRouting} from "./tracker.routing";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {AuthGuard} from "../../services/guard.service";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";

@NgModule({
    imports: [
        CommonModule, trackerRouting, FormsModule
    ],
    declarations: [TrackerComponent, HomeComponent, LoginComponent],
    exports: [CommonModule, FormsModule],

    providers: [
        AuthGuard, AuthenticationService
    ]
})
export class TrackerModule {
}

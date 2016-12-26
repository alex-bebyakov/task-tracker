import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrackerComponent} from "./tracker.component";
import {trackerRouting} from "./tracker.routing";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {AuthGuard} from "../../services/guard.service";
import {PrivateComponent} from "./private/private.component";
import {LoginComponent} from "./login/login.component";
import {ListComponent} from "./private/list/list.component";
import {BookComponent} from "./private/book/book.component";
import {PrivateService} from "../../services/private.service";


@NgModule({
    imports: [
        CommonModule, trackerRouting, FormsModule
    ],
    declarations: [TrackerComponent, PrivateComponent, LoginComponent,BookComponent,ListComponent],
    exports: [CommonModule, FormsModule],

    providers: [
        AuthGuard, AuthenticationService,PrivateService
    ]
})
export class TrackerModule {
}

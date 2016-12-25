import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrackerComponent} from "./tracker.component";
import {trackerRouting} from "./tracker.routing";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {AuthGuard} from "../../services/guard.service";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ListComponent} from "./home/list/list.component";
import {BookComponent} from "./home/book/book.component";
import {OrderComponent} from "./home/order/order.component";
import {TrackerService} from "../../services/tracker.service";
import { DateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
    imports: [
        CommonModule, trackerRouting, FormsModule
    ],
    declarations: [TrackerComponent, HomeComponent, LoginComponent,BookComponent,ListComponent,OrderComponent],
    exports: [CommonModule, FormsModule],

    providers: [
        AuthGuard, AuthenticationService,TrackerService
    ]
})
export class TrackerModule {
}

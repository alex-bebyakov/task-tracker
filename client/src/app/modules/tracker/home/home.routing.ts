import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {AuthGuard} from "../../../services/guard.service";

export const homeRoutes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]}
];


import {Routes} from "@angular/router";
import {PrivateComponent} from "./private.component";
import {AuthGuard} from "../../../services/guard.service";
import {bookRoutes} from "./book/book.routing";
import {listRoutes} from "./list/list.routing";

export const privateRoutes: Routes = [
    {path: '', component: PrivateComponent, canActivate: [AuthGuard],
        children:[
            ...bookRoutes,
            ...listRoutes
        ]
    },

];


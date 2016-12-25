import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {AuthGuard} from "../../../services/guard.service";
import {listRoutes} from "./list/list.routing";
import {bookRoutes} from "./book/book.routing";
import {orderRoutes} from "./order/order.routing";

export const homeRoutes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard],
        children:[
            ...bookRoutes,
            ...orderRoutes,
             ...listRoutes
        ]
    },

];


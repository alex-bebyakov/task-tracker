import {Routes} from "@angular/router";
import {ListComponent} from "./list.component";

export const listRoutes: Routes = [
    {path: 'create', component: ListComponent},
    {path: 'update', component: ListComponent}
];


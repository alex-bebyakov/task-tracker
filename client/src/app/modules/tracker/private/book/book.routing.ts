import {Routes} from "@angular/router";
import {BookComponent} from "./book.component";


export const bookRoutes: Routes = [
    {path: '', component: BookComponent},
    {path: 'finish', component: BookComponent},
    {path: 'priority', component: BookComponent}
];

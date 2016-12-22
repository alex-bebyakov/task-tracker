import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {TrackerComponent} from "./tracker.component";
import {homeRoutes} from "./home/home.routing";
import {loginRoutes} from "./login/login.routing";
const trackerRoutes: Routes = [
    {
        path: '',
        component: TrackerComponent,
        children: [
            ...homeRoutes,
            ...loginRoutes,
        ]

    }
];

export const trackerRouting: ModuleWithProviders = RouterModule.forChild(trackerRoutes);

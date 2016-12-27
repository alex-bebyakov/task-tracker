import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {TrackerComponent} from "./tracker.component";
import {privateRoutes} from "./private/private.routing";
import {loginRoutes} from "./login/login.routing";
const trackerRoutes: Routes = [
    {
        path: '',
        component: TrackerComponent,
        children: [
            ...privateRoutes,
            ...loginRoutes
        ]

    }
];

export const trackerRouting: ModuleWithProviders = RouterModule.forChild(trackerRoutes);

import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {TrackerComponent} from "./tracker.component";


const trackerRoutes: Routes = [
  {
    path: '',
    component: TrackerComponent,

  }
];

export const trackerRouting: ModuleWithProviders = RouterModule.forChild(trackerRoutes);

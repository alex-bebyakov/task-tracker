import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrackerComponent} from "./tracker.component";
import {trackerRouting} from "./tracker.routing";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule, trackerRouting, FormsModule
  ],
  declarations: [TrackerComponent],
  exports: [CommonModule, FormsModule]
})
export class TrackerModule {
}

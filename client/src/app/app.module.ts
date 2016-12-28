import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NavbarModule} from "./modules/navbar/navbar.module";
import {FooterModule} from "./modules/footer/footer.module";
import {TrackerModule} from "./modules/tracker/tracker.module";
import {AppComponent} from "./app.component";
import {routing} from "./app.routing";
import { DateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NavbarModule,
        FooterModule,
        TrackerModule,
        DateValueAccessorModule,
        routing
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './modules/app-routing.module';

import {AppComponent} from './components/app/app.component';
import {MaterialModule} from './modules/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {YaCoreModule} from 'angular2-yandex-maps';
import {SimpleGuard} from './guards/simple.guard';
import {ReactiveFormsModule} from '@angular/forms';
import {WindowComponent} from './components/window/window.component';
import {ViewerComponent} from "./components/viewer/viewer.component";
import {IndexComponent} from "./components/index/index.component";
import {WindowService} from "./services/window.service";
import {ToastService} from "./services/toast.service";
import {SnackService} from "./services/snack.service";
import {ApiService} from "./services/api.service";
import {DraggableDirective} from './directives/draggable.directive';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    WindowComponent,
    IndexComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    YaCoreModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SimpleGuard, WindowService, ToastService, SnackService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

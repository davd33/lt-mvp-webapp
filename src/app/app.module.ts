import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {LtService} from "./lt/lt.service";
import { LtComponent } from './lt/lt.component';
import { RunLt1Component } from './run-lt-1/run-lt-1.component';

@NgModule({
  declarations: [
    AppComponent,
    LtComponent,
    RunLt1Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [LtService],
  bootstrap: [AppComponent]
})
export class AppModule { }

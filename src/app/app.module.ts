import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {LtService} from "./lt/lt.service";
import {LtComponent} from './lt/lt.component';
import {RunLt1Component} from './run-lt-1/run-lt-1.component';
import {SignUpComponent} from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LtComponent,
    RunLt1Component,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'run-lt-1',
        component: RunLt1Component
      },
      {
        path: '',
        redirectTo: '/run-lt-1',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [LtService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

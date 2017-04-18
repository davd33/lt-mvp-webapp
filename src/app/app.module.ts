import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {LtService} from "./services/lt.service";
import {LtComponent} from './lt/lt.component';
import {RunLt1Component} from './run-lt-1/run-lt-1.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MovingFlagComponent} from './moving-flag/moving-flag.component';
import {IndexComponent} from './index/index.component';
import {ChooseLevelComponent} from './choose-level/choose-level.component';
import {ChooseTrainingComponent} from './choose-training/choose-training.component';
import {SignUpService} from "./services/sign-up.service";
import {LangService} from "./services/lang.service";
import {CookiesInfoComponent} from './cookies-info/cookies-info.component';
import {RecaptchaService} from "./services/recaptcha.service";

@NgModule({
  declarations: [
    AppComponent,
    LtComponent,
    RunLt1Component,
    SignUpComponent,
    NotFoundComponent,
    MovingFlagComponent,
    IndexComponent,
    ChooseLevelComponent,
    ChooseTrainingComponent,
    CookiesInfoComponent,
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
        path: 'run-lt-1/:level/:training',
        component: RunLt1Component
      },
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'choose-level',
        component: ChooseLevelComponent
      },
      {
        path: 'choose-training/:level',
        component: ChooseTrainingComponent
      },
      {
        path: 'cookies-info',
        component: CookiesInfoComponent
      },
      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [LtService, SignUpService, Title, LangService, RecaptchaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

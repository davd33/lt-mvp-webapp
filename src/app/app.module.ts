import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatSliderModule} from '@angular/material';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {CookiesInfoComponent} from './cookies-info/cookies-info.component';
import {ChooseTrainingComponent} from './choose-training/choose-training.component';
import {ChooseLevelComponent} from './choose-level/choose-level.component';
import {IndexComponent} from './index/index.component';
import {MovingFlagComponent} from './moving-flag/moving-flag.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RunLt1Component} from './run-lt-1/run-lt-1.component';
import {LtComponent} from './lt/lt.component';

import {LtService} from './services/lt.service';
import {LangService} from './services/lang.service';
import {RecaptchaService} from './services/recaptcha.service';
import {BgImgAnimService} from './services/bg-img-anim.service';

// needed for angular material
import 'hammerjs';
import { LtHelpComponent } from './lt-help/lt-help.component';
import {KeyboardService} from './services/keyboard.service';

@NgModule({
  declarations: [
    AppComponent,
    LtComponent,
    RunLt1Component,
    NotFoundComponent,
    MovingFlagComponent,
    IndexComponent,
    ChooseLevelComponent,
    ChooseTrainingComponent,
    CookiesInfoComponent,
    MenuComponent,
    LtHelpComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'lt-mvp-webapp' }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    RouterModule.forRoot([
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
  providers: [
    LtService,
    Title,
    LangService,
    RecaptchaService,
    BgImgAnimService,
    KeyboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

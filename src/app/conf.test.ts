import {RouterTestingModule} from '@angular/router/testing';
import {MenuComponent} from './menu/menu.component';
import {CookiesInfoComponent} from './cookies-info/cookies-info.component';
import {ChooseTrainingComponent} from './choose-training/choose-training.component';
import {ChooseLevelComponent} from './choose-level/choose-level.component';
import {IndexComponent} from './index/index.component';
import {MovingFlagComponent} from './moving-flag/moving-flag.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RunLt1Component} from './run-lt-1/run-lt-1.component';
import {LtComponent} from './lt/lt.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material';
import {BrowserTestingModule} from '@angular/platform-browser/testing';

import {LtService} from './services/lt.service';
import {Title} from '@angular/platform-browser';
import {LangService} from './services/lang.service';
import {RecaptchaService} from './services/recaptcha.service';
import {BgImgAnimService} from './services/bg-img-anim.service';
import {AppComponent} from './app.component';

const TEST_ROUTES = RouterTestingModule.withRoutes([
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
]);

export const TEST_MODULE = {
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
    MenuComponent
  ],
  imports: [
    TEST_ROUTES,
    BrowserTestingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [
    LtService,
    Title,
    LangService,
    RecaptchaService,
    BgImgAnimService
  ],
};

import {RouterTestingModule} from '@angular/router/testing';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import {MenuComponent} from './menu/menu.component';
import {CookiesInfoComponent} from './cookies-info/cookies-info.component';
import {ChooseTrainingComponent} from './choose-training/choose-training.component';
import {ChooseLevelComponent} from './choose-level/choose-level.component';
import {IndexComponent} from './index/index.component';
import {MovingFlagComponent} from './moving-flag/moving-flag.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RunLt1Component} from './run-lt-1/run-lt-1.component';
import {LtComponent} from './lt/lt.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdSliderModule} from '@angular/material';
import {BrowserTestingModule} from '@angular/platform-browser/testing';

import {LtService} from './services/lt.service';
import {SignUpService} from './services/sign-up.service';
import {Title} from '@angular/platform-browser';
import {LangService} from './services/lang.service';
import {RecaptchaService} from './services/recaptcha.service';
import {BgImgAnimService} from './services/bg-img-anim.service';
import {DeleteUserService} from './services/delete-user.service';
import {AppComponent} from './app.component';

const TEST_ROUTES = RouterTestingModule.withRoutes([
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
    path: 'delete-user/:user/:token',
    component: DeleteUserComponent
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
    SignUpComponent,
    NotFoundComponent,
    MovingFlagComponent,
    IndexComponent,
    ChooseLevelComponent,
    ChooseTrainingComponent,
    CookiesInfoComponent,
    MenuComponent,
    DeleteUserComponent
  ],
  imports: [
    TEST_ROUTES,
    BrowserTestingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdSliderModule,
  ],
  providers: [
    LtService,
    SignUpService,
    Title,
    LangService,
    RecaptchaService,
    BgImgAnimService,
    DeleteUserService
  ],
};

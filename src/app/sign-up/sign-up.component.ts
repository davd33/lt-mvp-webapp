import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {routerTransition} from '../router.animations';
import {SignUpService} from "../services/sign-up.service";
import {LangService} from "../services/lang.service";

declare const grecaptcha: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['sign-up.component.scss'],
  host: {'[@routerTransition]': ''},
  animations: [
    routerTransition()
  ]
})
export class SignUpComponent implements OnInit, AfterViewInit {

  email: string;
  price: number;

  error: string;

  captchaId: any;

  registrationSuccess: boolean = false;
  emailRegex: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  captchaResult: string;

  @ViewChild('input') inputChild;
  @ViewChild('captcha') captchaChild;
  @ViewChild('signUpForm') formChild;

  constructor(private signUpService: SignUpService,
              private titleService: Title,
              private lang: LangService) {
    window['onloadCallback'] = this.captchaLoad.bind(this);
  }

  ngOnInit() {
    this.titleService.setTitle(
      `${this.lang.text.Global.title} - ${this.lang.text.SignUp.title}`
    )
  }

  ngAfterViewInit() {
    this.inputChild.nativeElement.focus();
  }

  sendForm() {
    if (this.formChild.valid && this.captchaResult) {
      this.signUpService.registerMail(this.email, this.price, this.captchaResult)
        .then((res) => {
          this.registrationSuccess = true;
        })
        .catch((e) => {
          let message = e.json().message;
          if (message === 'Captcha not valid!') {
            grecaptcha.reset(this.captchaId);
            this.error = this.lang.text.SignUp.serverCaptchaError;
          }
        });
    } else if (!this.captchaResult) {
      this.error = this.lang.text.SignUp.validateCaptcha;
    }
  }

  keyValid(event: any) {
    if (event.key == "Enter") {
      this.error = "";
      this.sendForm();
    }
  }

  captchaLoad() {
    let captchaChildElmt = this.captchaChild.nativeElement;

    this.captchaId = grecaptcha.render(captchaChildElmt, {
      'sitekey': '6LfAHR0UAAAAANvcs6MfnYzUMeJE-V3MhNaTfQNt',
      'callback': (res) => {
        this.captchaResult = res;
      },
      'theme': 'light'
    });
  }

}

import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

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

  registrationSuccess: boolean = false;
  emailRegex: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  captchaDone: boolean = false;

  @ViewChild('input') inputChild;
  @ViewChild('captcha') captchaChild;
  @ViewChild('signUpForm') formChild;

  constructor(private signUpService: SignUpService,
              private lang: LangService) {
    window['onloadCallback'] = this.captchaLoad.bind(this);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.inputChild.nativeElement.focus();
  }

  sendForm() {
    if (this.formChild.valid && this.captchaDone) {
      this.signUpService.registerMail(this.email.trim(), this.price)
        .then((res) => {
          console.log(res);
          this.registrationSuccess = true;
        });
    }
  }

  keyValid(event: any) {
    if (event.key == "Enter") {
      this.sendForm();
    }
  }

  captchaLoad() {
    let captchaChildElmt = this.captchaChild.nativeElement;

    grecaptcha.render(captchaChildElmt, {
      'sitekey': '6LfAHR0UAAAAANvcs6MfnYzUMeJE-V3MhNaTfQNt',
      'callback': (res) => {
        this.captchaDone = true;
      },
      'theme': 'light'
    });
  }

}

import {Component, OnInit, ViewChild, AfterViewInit, HostBinding} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {rtSimple} from '../router.animations';
import {anims} from "./sign-up.animations";

import {SignUpService} from '../services/sign-up.service';
import {LangService} from '../services/lang.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['sign-up.component.scss'],
  animations: [
    rtSimple(),
    anims()
  ]
})
export class SignUpComponent implements OnInit, AfterViewInit {

  @HostBinding('@rtSimple') hostAnim = '';

  email: string;
  price: number;

  registrationSuccess = false;
  captchaValid = false;

  sliderValue = 0;

  @ViewChild('input') inputChild;
  @ViewChild('signUpForm') formChild;

  constructor(private signUpService: SignUpService,
              private titleService: Title,
              private lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(
      `${this.lang.text.Global.title} - ${this.lang.text.SignUp.title}`
    );
  }

  ngAfterViewInit() {
    this.inputChild.nativeElement.focus();
  }

  sendForm() {
    if (this.formChild.valid && this.captchaValid) {
      this.signUpService.registerMail(this.email, this.price)
        .then((res) => {
          this.registrationSuccess = true;
        });
    }
  }

  resetCaptcha() {
    this.captchaValid = false;
    setTimeout(() => {
      this.sliderValue = 0;
    }, 0);
  }

  sliderChange(event) {
    this.sliderValue = event.value;

    if (this.sliderValue === 100 && this.formChild.valid) {
      this.captchaValid = true;
      this.sendForm();
    } else {
      this.resetCaptcha();
    }
  }

}

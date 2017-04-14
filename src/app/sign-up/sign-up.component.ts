import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import {routerTransition} from '../router.animations';
import {SignUpService} from "../services/sign-up.service";
import {LangService} from "../services/lang.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['sign-up.component.scss'],
  host: {'[@routerTransition]': ''},
  animations: [
    routerTransition()
  ]
})
export class SignUpComponent implements AfterViewInit {

  email: string;
  price: number;
  registrationSuccess: boolean = false;
  @ViewChild('input') inputChild;
  emailRegex: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private signUpService: SignUpService,
              private lang: LangService) {
  }

  ngAfterViewInit() {
    this.inputChild.nativeElement.focus();
  }

  sendForm() {
    if (this.email && this.email.trim() !== "")
      this.signUpService.registerMail(this.email.trim(), this.price)
        .then((res) => {
          console.log(res);
          this.registrationSuccess = true;
        });
  }

  keyValid(event: any) {
    if (event.key == "Enter") {
      this.sendForm();
    }
  }

}

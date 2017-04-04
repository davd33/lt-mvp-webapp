import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import {routerTransition} from '../router.animations';
import {SignUpService} from "../services/sign-up.service";

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

  constructor(
    private signUpService: SignUpService
  ) { }

  ngAfterViewInit() {
    this.inputChild.nativeElement.focus();
  }

  sendForm() {
    this.signUpService.registerMail(this.email, this.price)
      .then((res) => {
        console.log(res);
        this.registrationSuccess = true;
      });
  }

}

import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import {routerTransition} from '../router.animations';

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

  @ViewChild('input') inputChild;

  constructor() { }

  ngAfterViewInit() {
    this.inputChild.nativeElement.focus();
  }

}

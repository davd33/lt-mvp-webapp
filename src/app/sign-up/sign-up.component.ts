import { Component, OnInit } from '@angular/core';

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
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

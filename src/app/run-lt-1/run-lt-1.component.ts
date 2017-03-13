import {Component, OnInit, trigger, state, style, transition, animate, keyframes} from '@angular/core';

import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-run-lt-1',
  templateUrl: './run-lt-1.component.html',
  styleUrls: ['./run-lt-1.component.scss'],
  host: {'[@routerTransition]': ''},
  animations: [
    routerTransition(),
    trigger('lt', [
      transition(':leave', [
        animate('.3s', keyframes([
          style({transform: 'translate(0)', offset: 0}),
          style({transform: 'translate(+10%)', offset: 0.4}),
          style({opacity: 0, transform: 'translate(-100%)', offset: 1})
        ]))
      ])
    ]),
    trigger('success', [
      transition(':enter', [
        animate('.3s .5s', keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 1})
        ]))
      ])
    ])
  ]
})
export class RunLt1Component implements OnInit {

  displayTest: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  toggleDisplayTest() {
    this.displayTest = !this.displayTest;
  }

}

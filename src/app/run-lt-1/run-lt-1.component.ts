import {Component, OnInit, trigger, style, transition, animate, keyframes} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import {rtFadeInOut} from '../router.animations';

@Component({
  selector: 'app-run-lt-1',
  templateUrl: './run-lt-1.component.html',
  styleUrls: ['./run-lt-1.component.scss'],
  host: {'[@rtFadeInOut]': ''},
  animations: [
    rtFadeInOut(),
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
  level: string;
  training: string;
  loadTestError: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getLevelParam();
    this.getTrainingParam();
  }

  toggleDisplayTest() {
    this.displayTest = !this.displayTest;
  }

  getTrainingParam() {
    const param: Observable<string> = this.route.params.map(p => p['training']);
    param.subscribe((training) => {
      this.training = training;
    });
  }

  getLevelParam() {
    const param: Observable<string> = this.route.params.map(p => p['level']);
    param.subscribe((level) => {
      this.level = level;
    });
  }

}

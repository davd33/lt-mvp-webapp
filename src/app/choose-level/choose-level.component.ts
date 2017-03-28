import {Component, OnInit, trigger} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-choose-level',
  templateUrl: './choose-level.component.html',
  styleUrls: ['./choose-level.component.css'],
  animations: [
  ]
})
export class ChooseLevelComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

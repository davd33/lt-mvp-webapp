import {Component, Input, OnInit} from '@angular/core';

import {flagAnim} from "./moving-flag.animation";

@Component({
  selector: 'app-moving-flag',
  templateUrl: './moving-flag.component.html',
  styleUrls: ['moving-flag.component.scss'],
  host: {'[@flag]': ''},
  animations: [flagAnim()]
})
export class MovingFlagComponent implements OnInit {

  @Input() explanation;

  constructor() { }

  ngOnInit() {
  }

}

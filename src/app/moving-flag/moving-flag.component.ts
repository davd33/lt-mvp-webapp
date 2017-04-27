import {Component, HostBinding, Input, OnInit} from '@angular/core';

import {flagAnim} from './moving-flag.animation';

@Component({
  selector: 'app-moving-flag',
  templateUrl: './moving-flag.component.html',
  styleUrls: ['moving-flag.component.scss'],
  animations: [flagAnim()]
})
export class MovingFlagComponent implements OnInit {

  @HostBinding('@flag') hostAnim = '';

  @Input() explanation;
  @Input() color;

  constructor() { }

  ngOnInit() {
  }

}

import {Component, HostBinding, Input, OnInit} from '@angular/core';

import {flagAnim} from './moving-flag.animation';
import {LangService} from "../services/lang.service";

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
  @Input() answer: boolean;

  constructor(public lang: LangService) { }

  ngOnInit() {
  }

  explanationTableKeys(): string[] {
    return Object.keys(this.explanation.table);
  }

}

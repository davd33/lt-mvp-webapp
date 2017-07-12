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

  getFirstSentence(text: string) {
    return text.replace(/(\.) .*$/, '$1');
  }

  explanationTableKeys(): string[] {
    return Object.keys(this.explanation.table);
  }

  getExplanationValue(explanationValue): string {
    let value = this.lang.text.LtHelp.table[explanationValue];

    if (typeof explanationValue === 'boolean')
      value = this.lang.text.LtHelp.table[explanationValue.toString()];

    return value;
  }

}

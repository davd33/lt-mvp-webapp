import {Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';

import {flagAnim} from './moving-flag.animation';
import {LangService} from "../services/lang.service";
import {LtInputsService} from '../services/lt-inputs.service';

@Component({
  selector: 'app-moving-flag',
  templateUrl: './moving-flag.component.html',
  styleUrls: ['moving-flag.component.scss']
})
export class MovingFlagComponent implements OnInit {

  @Input() explanation;
  @Input() color;
  @Input() answer: boolean;

  @ViewChild('mfContainer') mfContainerChild: ElementRef

  private currentInputEl

  constructor(public lang: LangService,
              private ltInputsSvc: LtInputsService) { }

  ngOnInit() {

    this.ltInputsSvc.onHelpNeeded().subscribe(value => {
      this.currentInputEl = value.input
      if (value.activate) {
        this.mfContainerChild.nativeElement.classList.toggle('active')
      }
    })
  }

  closeHelpPanel() {
    this.ltInputsSvc.closeHelpPanel(this.currentInputEl)
    this.mfContainerChild.nativeElement.classList.toggle('deactivating')
    setTimeout(() => {
      this.mfContainerChild.nativeElement.classList.toggle('active')
      this.mfContainerChild.nativeElement.classList.toggle('deactivating')
    }, 300)
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

  getInfo() {
    let res = [];

    // highlight sentence
    res = this.explanation.info.split(/(`.*`)/);

    return res;
  }

  isHighlight(part: string) {
    return /^`.*`$/.test(part);
  }

  highlight(part: string) {
    return part.replace(/`(.*)`/, "$1");
  }

}

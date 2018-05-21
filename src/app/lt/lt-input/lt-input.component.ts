import {AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LtInputsService} from '../../services/lt-inputs.service';

@Component({
  selector: 'app-lt-input',
  templateUrl: './lt-input.component.html',
  styleUrls: ['./lt-input.component.scss']
})
export class LtInputComponent implements OnInit, OnDestroy {

  value = ''
  explanation: any
  i: number

  formInputGroup

  private inputAdded

  @ViewChild('input') inputChild: ElementRef

  constructor(private ltInputsSvc: LtInputsService,
              private renderer: Renderer2) {
  }

  ngOnInit() {

    if (this.isInitiated() && !this.inputAdded) {
      this.ltInputsSvc.addInput(this.inputChild)
      this.inputAdded = true
    }

    if (!this.ltInputsSvc.isReady() && this.ltInputsSvc.areInputsReady()) {
      setTimeout(() => {
        this.ltInputsSvc.markReady()
      }, 0)
    }
  }

  ngOnDestroy() {
  }

  controlChanged(event, input, index, explanation) {
    this.ltInputsSvc.controlChanged(event, input, index, explanation, this.renderer)
  }

  navigate(event, input) {
    this.ltInputsSvc.navigate(event, input)
  }

  onInputClick(input, explanation) {
    this.ltInputsSvc.ltHoleClicked(input, explanation)
  }

  luckenInputStatus(input) {
    if (!this.isReady())
      return false

    return this.ltInputsSvc.luckenInputStatus(input)
  }

  isInputInvalid(input) {
    if (!this.isReady())
      return false

    return this.ltInputsSvc.isInputInvalid(input)
  }

  isInputValid(input) {
    if (!this.isReady())
      return false

    return this.ltInputsSvc.isInputValid(input)
  }

  isInitiated() {
    return this.ltInputsSvc.isInitiated()
  }

  isReady() {
    return this.ltInputsSvc.isReady()
  }

}

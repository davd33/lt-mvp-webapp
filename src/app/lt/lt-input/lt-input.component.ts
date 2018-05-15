import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-lt-input',
  templateUrl: './lt-input.component.html',
  styleUrls: ['./lt-input.component.scss']
})
export class LtInputComponent implements OnInit, AfterViewChecked {

  value = ''

  done = false

  @ViewChild('input') inputChild: ElementRef

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (!this.done) {
      this.inputChild.nativeElement.value = this.value
      this.done = true
    }
  }

}

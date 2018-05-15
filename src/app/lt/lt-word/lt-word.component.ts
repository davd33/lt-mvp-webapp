import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-lt-word',
  templateUrl: './lt-word.component.html',
  styleUrls: ['./lt-word.component.scss']
})
export class LtWordComponent implements OnInit, AfterViewChecked {

  innerHTML: string = ''

  @ViewChild('content') content: ElementRef

  done = false

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (!this.done) {
      this.content.nativeElement.innerHTML = this.innerHTML
      this.done = true
    }
  }

}

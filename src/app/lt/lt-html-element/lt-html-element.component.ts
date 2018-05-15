import {
  AfterViewChecked, Component, ElementRef,
  OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-lt-html-element',
  templateUrl: './lt-html-element.component.html',
  styleUrls: ['./lt-html-element.component.scss']
})
export class LtHtmlElementComponent implements OnInit, AfterViewChecked {

  element: any

  @ViewChild('content', {read: ViewContainerRef}) eltViewRef: ViewContainerRef

  @ViewChild('contentOut') content: ElementRef

  done = false

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (!this.done) {
      this.content.nativeElement.parentNode.insertBefore(this.element, this.content.nativeElement)
      this.element.appendChild(this.content.nativeElement)
      this.done = true
    }
  }

}

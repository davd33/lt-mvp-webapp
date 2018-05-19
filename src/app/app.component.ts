import {Component, HostListener, OnInit} from '@angular/core';

import {LangService} from './services/lang.service';
import {KeyboardService} from "./services/keyboard.service";
import {MouseService} from './services/mouse.service';
import {WindowService} from './services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public lang: LangService,
    private keyboard: KeyboardService,
    private mouse: MouseService,
    private window: WindowService
  ) {
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: MouseEvent) {
    this.mouse.obs.next(event)
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyboard.obs.next(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.window.obs.next(event)
  }
}

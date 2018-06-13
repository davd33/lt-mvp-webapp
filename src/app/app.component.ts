import {Component, HostListener, OnInit} from '@angular/core';

import {LangService} from './services/lang.service';
import {KeyboardService} from "./services/keyboard.service";
import {MouseService} from './services/mouse.service';
import {WindowService} from './services/window.service';
import {routerTransition} from './router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ]
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

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: MouseEvent) {
    this.mouse.obs.next(event)
  }

  // @HostListener('touchmove', ['$event'])
  // onTouchMove(event: MouseEvent) {
  //   this.mouse.obs.next(event)
  // }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyboard.obs.next(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.window.obs.next(event)
  }
}

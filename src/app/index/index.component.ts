import {Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {LangService} from '../services/lang.service';
import {MouseService} from '../services/mouse.service';
import {WindowService} from '../services/window.service';
import {LTLogo} from './lt-logo.canvas';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  private logoAnimation: LTLogo

  @ViewChild('topSection') topSectionEl: ElementRef
  @ViewChild('slide2') slide2El: ElementRef
  @ViewChild('ltLogo') ltLogoEl: ElementRef

  constructor(private titleService: Title,
              public lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.lang.text.Global.title)
    this.logoAnimation = new LTLogo(this.ltLogoEl)
    this.logoAnimation.doStart()
  }

  ngOnDestroy() {
    this.logoAnimation.doStop()
  }

  toSlide2() {
    this.slide2El.nativeElement.scrollIntoView({behavior: 'smooth'})
  }


}

import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {LangService} from '../services/lang.service';
import {LTLogo} from './lt-logo.canvas';
import {Router} from '@angular/router';

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
  @ViewChild('container') containerEl: ElementRef

  constructor(private titleService: Title,
              private router: Router,
              public lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.lang.text.Global.title)
    this.logoAnimation = new LTLogo(this.ltLogoEl)
    this.logoAnimation.doStart()
  }

  ngOnDestroy() {
    LTLogo.doStop()
  }

  toSlide2() {
    this.router.navigate(['/index2'])
  }


}

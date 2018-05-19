import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {LangService} from '../services/lang.service';
import {MouseService} from '../services/mouse.service';
import {WindowService} from '../services/window.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild('topSection') topSectionEl: ElementRef

  private windowHeight: number

  constructor(private titleService: Title,
              private mouse: MouseService,
              private window: WindowService,
              public lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.lang.text.Global.title)

    this.windowHeight = window.innerHeight
    this.window.obs.subscribe(value => {
      this.windowHeight = value.target.innerHeight
    })

    this.mouse.obs.subscribe(value => {
      const y = value.pageY
      let windowPercent = 1 - (y / this.windowHeight)
      this.topSectionEl.nativeElement.style.opacity = `${windowPercent < 0 ? 0 : windowPercent}`
      this.topSectionEl.nativeElement.style.transform = `translateY(${y/25}vh)`
    })
  }


}

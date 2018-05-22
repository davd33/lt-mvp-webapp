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

  constructor(private titleService: Title,
              public lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.lang.text.Global.title)
  }


}

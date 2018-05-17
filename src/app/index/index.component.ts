import {Component, HostBinding, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {LangService} from '../services/lang.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private titleService: Title,
              public lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.lang.text.Global.title);
  }

}

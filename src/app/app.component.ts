import {Component, OnInit} from '@angular/core';

import {LangService} from './services/lang.service';
import {BgImgAnimService} from './services/bg-img-anim.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  bgImgStopped = false;
  bgImgBlur = '';

  constructor(
    public lang: LangService,
    private bgImgAnim: BgImgAnimService
  ) {
  }

  ngOnInit() {
    this.bgImgAnim.animStopped
      .subscribe(value => {
        this.bgImgStopped = value;
      });

    this.bgImgAnim.blur
      .subscribe(value => {
        this.bgImgBlur = value;
      });
  }
}

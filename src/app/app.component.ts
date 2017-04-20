import {Component, OnInit} from '@angular/core';
import {LangService} from "./services/lang.service";
import {BgImgAnimService} from "./services/bg-img-anim.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public lang: LangService,
    private bgImgAnim: BgImgAnimService
  ) {
  }

  ngOnInit() {
  }

  bgImgStopped() {
    return this.bgImgAnim.animStopped;
  }

  bgImgBlur() {
    return this.bgImgAnim.blur;
  }
}

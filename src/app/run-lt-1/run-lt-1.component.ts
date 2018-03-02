import {Component, OnInit, OnDestroy, HostBinding} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {rtSimple} from '../router.animations';
import {LangService} from '../services/lang.service';
import {BgImgAnimService} from '../services/bg-img-anim.service';

@Component({
  selector: 'app-run-lt-1',
  templateUrl: './run-lt-1.component.html',
  styleUrls: ['./run-lt-1.component.scss'],
  animations: [rtSimple()]
})
export class RunLt1Component implements OnDestroy, OnInit {

  @HostBinding('@rtSimple') hostAnim = '';

  level: string;
  training: string;
  loadTestError: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private lang: LangService,
    private bgImgAnim: BgImgAnimService
  ) {
  }

  ngOnDestroy() {
    this.bgImgAnim.startAnim();
    this.bgImgAnim.animChangeBlur('0');
  }

  ngOnInit() {
    this.titleService.setTitle(
      `${this.lang.text.Global.title} - ${this.lang.text.RunLt1.title}`
    );
    this.getLevelParam();
    this.getTrainingParam();

    this.bgImgAnim.stopAnim();
    this.bgImgAnim.animChangeBlur('15px');
  }

  gotoSignUp() {
    window.location.href = 'https://luckentests.launchaco.com/';
  }

  setError(event: any) {
    console.log(event);
  }

  getTrainingParam() {
    const param: Observable<string> = this.route.params.map(p => p['training']);
    param.subscribe((training) => {
      this.training = training;
    });
  }

  getLevelParam() {
    const param: Observable<string> = this.route.params.map(p => p['level']);
    param.subscribe((level) => {
      this.level = level;
    });
  }

}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import {rtSimple} from '../router.animations';
import {LangService} from "../services/lang.service";
import {BgImgAnimService} from "../services/bg-img-anim.service";

@Component({
  selector: 'app-run-lt-1',
  templateUrl: './run-lt-1.component.html',
  styleUrls: ['./run-lt-1.component.scss'],
  host: {'[@rtSimple]': ''},
  animations: [rtSimple()]
})
export class RunLt1Component implements OnDestroy, OnInit {

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
    this.bgImgAnim.animStopped = false;
    this.bgImgAnim.blur = "0";
  }

  ngOnInit() {
    this.titleService.setTitle(
      `${this.lang.text.Global.title} - ${this.lang.text.RunLt1.title}`
    );
    this.getLevelParam();
    this.getTrainingParam();

    this.bgImgAnim.animStopped = true;
    this.bgImgAnim.blur = "15px";
  }

  gotoSignUp() {
    this.router.navigate(['sign-up']);
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

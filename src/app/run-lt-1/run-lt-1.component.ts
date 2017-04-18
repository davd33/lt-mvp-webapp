import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import {rtFadeInSlideUp} from '../router.animations';
import {LangService} from "../services/lang.service";

@Component({
  selector: 'app-run-lt-1',
  templateUrl: './run-lt-1.component.html',
  styleUrls: ['./run-lt-1.component.scss'],
  host: {'[@rtFadeInSlideUp]': ''},
  animations: [rtFadeInSlideUp()]
})
export class RunLt1Component implements OnInit {

  level: string;
  training: string;
  loadTestError: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private lang: LangService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(
      `${this.lang.text.Global.title} - ${this.lang.text.RunLt1.title}`
    );
    this.getLevelParam();
    this.getTrainingParam();
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

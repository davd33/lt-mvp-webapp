import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {rtSimple} from '../router.animations';
import {LangService} from '../services/lang.service';

@Component({
  selector: 'app-choose-level',
  templateUrl: './choose-level.component.html',
  styleUrls: ['./choose-level.component.scss'],
  animations: [
    rtSimple()
  ]
})
export class ChooseLevelComponent implements OnInit {

  @HostBinding('@rtSimple') hostAnim = '';

  constructor(private router: Router,
              private titleService: Title,
              public lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(`${this.lang.text.Global.title} - ${this.lang.text.ChooseLevel.title}`);
  }

  gotoChooseTraining(level: string) {
    this.router.navigate(['/choose-training', level]);
  }

}

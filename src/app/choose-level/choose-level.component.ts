import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {LangService} from '../services/lang.service';

@Component({
  selector: 'app-choose-level',
  templateUrl: './choose-level.component.html',
  styleUrls: ['./choose-level.component.scss']
})
export class ChooseLevelComponent implements OnInit {

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

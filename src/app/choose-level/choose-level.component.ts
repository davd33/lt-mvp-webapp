import {Component, OnInit, trigger} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {rtSimple} from '../router.animations';
import {LangService} from "../services/lang.service";

@Component({
  selector: 'app-choose-level',
  templateUrl: './choose-level.component.html',
  styles: [`
    .choose-level-container ul li a.comming-soon:hover::after {
      content: "${LangService.lang('en').ChooseLevel.comeSoon}";
    }
  `, require('./choose-level.component.scss')],
  host: {'[@rtSimple]': ''},
  animations: [
    rtSimple()
  ]
})
export class ChooseLevelComponent implements OnInit {

  constructor(private router: Router,
              private titleService: Title,
              public lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(`${this.lang.text.Global.title} - ${this.lang.text.ChooseLevel.title}`)
  }

  gotoChooseTraining(level: string) {
    this.router.navigate(['/choose-training', level]);
  }

}

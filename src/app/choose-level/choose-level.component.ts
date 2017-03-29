import {Component, OnInit, trigger} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {rtFadeOut} from '../router.animations';

@Component({
  selector: 'app-choose-level',
  templateUrl: './choose-level.component.html',
  styleUrls: ['./choose-level.component.scss'],
  host: {'[@rtFadeOut]': ''},
  animations: [
    rtFadeOut()
  ]
})
export class ChooseLevelComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  gotoChooseTraining(level: string) {
    this.router.navigate(['/choose-training', level]);
  }

}

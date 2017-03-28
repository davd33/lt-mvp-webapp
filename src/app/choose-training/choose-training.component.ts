import {Component, OnInit} from '@angular/core';

import {routerTransition} from '../router.animations';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-choose-training',
  templateUrl: './choose-training.component.html',
  styleUrls: ['./choose-training.component.css'],
  host: {'[@routerTransition]': ''},
  animations: [routerTransition()]
})
export class ChooseTrainingComponent implements OnInit {

  /**
   * Level chosen by the user.
   */
  level: string;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.level = this.route.params['level'];
  }

}

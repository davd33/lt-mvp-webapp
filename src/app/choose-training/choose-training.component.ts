import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import {rtFadeOut} from '../router.animations';

@Component({
  selector: 'app-choose-training',
  templateUrl: './choose-training.component.html',
  styleUrls: ['./choose-training.component.scss'],
  host: {'[@rtFadeOut]': ''},
  animations: [rtFadeOut()]
})
export class ChooseTrainingComponent implements OnInit {

  /**
   * Level chosen by the user.
   */
  level: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    const id: Observable<string> = this.route.params.map(p => p['level']);
    id.subscribe((level) => {
      this.level = level;
    });
  }

  gotoRunLt1(training: string) {
    this.router.navigate(['/run-lt-1', this.level, training]);
  }

}

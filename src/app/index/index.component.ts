import {Component, OnInit} from '@angular/core';

import {routerTransition} from '../router.animations';
import {SignUpService} from "../services/sign-up.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  host: {'[@routerTransition]': ''},
  animations: [routerTransition()]
})
export class IndexComponent implements OnInit {

  studentSignedUp: number = 0;

  constructor(
    private signedUpService: SignUpService
  ) {
  }

  ngOnInit() {
    this.signedUpService.signedUpStudents()
      .then(res => {
        this.studentSignedUp = res.count;
      });
  }

}

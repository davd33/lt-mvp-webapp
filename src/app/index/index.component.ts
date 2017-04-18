import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {routerTransition} from '../router.animations';
import {SignUpService} from "../services/sign-up.service";
import {LangService} from "../services/lang.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  host: {'[@routerTransition]': ''},
  animations: [routerTransition()]
})
export class IndexComponent implements OnInit {

  studentSignedUp: number = 0;

  constructor(private signedUpService: SignUpService,
              private titleService: Title,
              private lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.lang.text.Global.title);
    this.signedUpService.signedUpStudents()
      .then(res => {
        this.studentSignedUp = res.count;
      });
  }

}

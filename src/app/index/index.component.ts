import {Component, HostBinding, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {rtSimple} from '../router.animations';
import {SignUpService} from '../services/sign-up.service';
import {LangService} from '../services/lang.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [rtSimple()]
})
export class IndexComponent implements OnInit {

  @HostBinding('@rtSimple') hostAnim = '';

  studentSignedUp = 0;

  constructor(private signedUpService: SignUpService,
              private titleService: Title,
              private lang: LangService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.lang.text.Global.title);
  }

}

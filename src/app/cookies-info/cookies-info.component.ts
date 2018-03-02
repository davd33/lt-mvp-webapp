import { Component, OnInit } from '@angular/core';

import {LangService} from '../services/lang.service';

@Component({
  selector: 'app-cookies-info',
  templateUrl: './cookies-info.component.html',
  styleUrls: ['./cookies-info.component.scss']
})
export class CookiesInfoComponent implements OnInit {

  constructor(public lang: LangService) { }

  ngOnInit() {
  }

}

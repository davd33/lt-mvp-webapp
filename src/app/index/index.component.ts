import {Component, OnInit} from '@angular/core';

import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  host: {'[@routerTransition]': ''},
  animations: [routerTransition()]
})
export class IndexComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

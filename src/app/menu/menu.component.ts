import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {LangService} from '../services/lang.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuList: any

  constructor(private lang: LangService) { }

  ngOnInit() {
    this.menuList = [
      [this.lang.text.Menu.home, '/index'],
    ];
  }

}

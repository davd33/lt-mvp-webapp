import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {LangService} from '../services/lang.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuList: any;

  classes = {
    _menuListPane: false,
    _menuListPaneOut: false
  }

  constructor(private lang: LangService) { }

  ngOnInit() {
    this.menuList = [
      [this.lang.text.Menu.home, '/index'],
      [this.lang.text.Menu.start, '/choose-level'],
      [this.lang.text.Menu.random, '/lt/random'],
    ];
  }

  toggleMenuListPane() {
    if (this.classes._menuListPane) {
      this.classes._menuListPaneOut = true
      setTimeout(() => {
        this.classes._menuListPane = false
        this.classes._menuListPaneOut = false
      }, 200)
    } else this.classes._menuListPane = true;
  }

  getMenuContainerClasses() {
    return {
      'menu-list-pane': this.classes._menuListPane,
      'menu-list-pane-out': this.classes._menuListPaneOut,
      'menu-list': !this.classes._menuListPane
    }
  }

}

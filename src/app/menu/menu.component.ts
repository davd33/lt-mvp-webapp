import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {LangService} from '../services/lang.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuList: any;

  sideNavClosingTimeout

  classes = {
    _menuListPane: false,
    _menuListPaneOut: false
  }

  constructor(private lang: LangService) { }

  ngOnInit() {
    this.menuList = [
      [this.lang.text.Menu.home, '/index'],
    ];
  }

  toggleMenuListPane() {
    if (this.classes._menuListPane) {
      this.classes._menuListPaneOut = true

      if (!this.sideNavClosingTimeout) {
        this.sideNavClosingTimeout = setTimeout(() => {
          this.classes._menuListPane = false
          this.classes._menuListPaneOut = false
        }, 200)
      }
    } else {
      if (this.sideNavClosingTimeout) clearTimeout(this.sideNavClosingTimeout)
      this.classes._menuListPane = true
    }
  }

  getMenuContainerClasses() {
    return {
      'menu-list-pane': this.classes._menuListPane,
      'menu-list-pane-out': this.classes._menuListPaneOut,
      'menu-list': !this.classes._menuListPane
    }
  }

}

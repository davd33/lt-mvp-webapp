import { Component, OnInit } from '@angular/core';
import {helpAnim} from './lt-help.animations';

@Component({
  selector: 'app-lt-help',
  templateUrl: './lt-help.component.html',
  styleUrls: ['./lt-help.component.scss'],
  animations: [helpAnim()]
})
export class LtHelpComponent implements OnInit {

  needHelp = false;

  constructor() { }

  ngOnInit() {
  }

  toggleHelp() {
    this.needHelp = !this.needHelp;
  }

}

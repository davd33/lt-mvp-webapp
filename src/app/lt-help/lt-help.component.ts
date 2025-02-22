import { Component, OnInit } from '@angular/core';
import {helpAnim} from './lt-help.animations';
import {LangService} from "../services/lang.service";

@Component({
  selector: 'app-lt-help',
  templateUrl: './lt-help.component.html',
  styleUrls: ['./lt-help.component.scss'],
  animations: [helpAnim()]
})
export class LtHelpComponent implements OnInit {

  needHelp = false;

  constructor(public lang: LangService) { }

  ngOnInit() {
  }

  toggleHelp() {
    this.needHelp = !this.needHelp;
  }

}

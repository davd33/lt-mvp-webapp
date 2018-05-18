import { Component, OnInit } from '@angular/core';
import {LangService} from "../services/lang.service";

@Component({
  selector: 'app-lt-help',
  templateUrl: './lt-help.component.html',
  styleUrls: ['./lt-help.component.scss']
})
export class LtHelpComponent implements OnInit {

  needHelp = {
    In: false, Out: false
  }
  needHelpTimeout

  constructor(public lang: LangService) { }

  ngOnInit() {
  }

  toggleHelp() {
    if (this.needHelp.In) {
      this.needHelp.Out = true

      if (!this.needHelpTimeout) {
        this.needHelpTimeout = setTimeout(() => {
          this.needHelp.Out = false
          this.needHelp.In = false
        }, 150)
      }
    } else {
      if (this.needHelpTimeout) clearTimeout(this.needHelpTimeout)
      this.needHelp.In = true
    }
  }

}

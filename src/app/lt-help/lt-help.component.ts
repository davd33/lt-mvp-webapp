import { Component, OnInit } from '@angular/core';
import {LangService} from "../services/lang.service";

@Component({
  selector: 'app-lt-help',
  templateUrl: './lt-help.component.html',
  styleUrls: ['./lt-help.component.scss']
})
export class LtHelpComponent implements OnInit {

  constructor(public lang: LangService) { }

  ngOnInit() {
  }

}

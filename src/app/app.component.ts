import {Component, OnInit} from '@angular/core';
import {LangService} from "./services/lang.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public lang: LangService
  ) {
  }

  ngOnInit() {
  }
}

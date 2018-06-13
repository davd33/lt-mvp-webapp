import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LangService} from '../services/lang.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-index2',
  templateUrl: './index2.component.html',
  styleUrls: ['./index2.component.scss']
})
export class Index2Component implements OnInit {

  @Output('navigate') outputNavigate: EventEmitter<string> = new EventEmitter<string>()

  constructor(private titleService: Title,
              public lang: LangService) { }

  ngOnInit() {
    this.titleService.setTitle(this.lang.text.Global.title)
  }

}

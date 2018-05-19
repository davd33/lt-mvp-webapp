import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-lt-word',
  templateUrl: './lt-word.component.html',
  styleUrls: ['./lt-word.component.scss']
})
export class LtWordComponent implements OnInit {

  txt: string = ''
  words: string[] = []

  constructor() { }

  ngOnInit() {
    this.words = this.txt.split(' ')
  }

}

import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class WindowService {

  private _obs: Subject<any>;

  constructor() {
    this._obs = new Subject();
  }

  get obs(): Subject<any> {
    return this._obs;
  }

}

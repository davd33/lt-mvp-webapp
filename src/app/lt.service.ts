import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

import {LT_LIST} from './mock-tests';

@Injectable()
export class LtService {


  constructor(private http: Http) {
  }

  getTests(): Promise<any[]> {
    return Promise.resolve(LT_LIST);
  }

}

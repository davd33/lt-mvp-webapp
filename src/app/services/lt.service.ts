import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

import {LT_LIST} from '../mock-tests';

@Injectable()
export class LtService {


  constructor() {
  }

  getTestA2Prep(): Promise<any> {
    return Promise.resolve(LT_LIST[0])
  }

  getTestA2Verbs(): Promise<any> {
    return Promise.resolve(LT_LIST[1]);
  }

  getTestB1Prep(): Promise<any> {
    return Promise.resolve(LT_LIST[2]);
  }

  getTestB1Verbs(): Promise<any> {
    return Promise.resolve(LT_LIST[3]);
  }

}

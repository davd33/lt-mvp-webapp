import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignUpService {

  private frontAPIUrl = 'http://52.59.253.39:4242/';

  constructor(private http: Http) {
  }

  registerMail(email: string, price: number) {
    return this.http
      .post(
        this.frontAPIUrl,
        JSON.stringify({
          email: email,
          price: price
        })
      )
      .toPromise()
      .then(res => {
        console.log(res.json())
      });
  }

  private handleErrors(error: any) {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }
}

import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignUpService {

  // private frontAPIUrl = 'http://52.59.253.39:4242/';
  private frontAPIUrl = 'http://localhost:4242/api/registration';

  constructor(private http: Http) {
  }

  registerMail(email: string, price: number) {
    return this.http
      .post(
        this.frontAPIUrl,
        {
          email: email,
          price: price
        }
      )
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(this.handleError);
  }

  signedUpStudents(): any {
    return this.http
      .get(`${this.frontAPIUrl}/count`)
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

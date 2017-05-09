import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {environment} from '../../environments/environment';

@Injectable()
export class SignUpService {

  private frontAPIUrl =
    `http://${environment.signUp.frontAPIHost}:` +
    `${environment.signUp.frontAPIPort}/api/registration`;

  constructor(private http: Http) {
  }

  registerMail(email: string, price: number, comment: string) {
    return this.http
      .post(
        this.frontAPIUrl,
        {
          email: email,
          price: price,
          comment: comment
        }
      )
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  signedUpStudents(): any {
    return this.http
      .get(`${this.frontAPIUrl}/count`)
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

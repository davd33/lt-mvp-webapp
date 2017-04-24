import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignUpService {

  // TODO: make URL configurable
  private frontAPIUrl = 'http://localhost:4201/api/registration';

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

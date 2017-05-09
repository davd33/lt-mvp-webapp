import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {environment} from '../../environments/environment';

@Injectable()
export class DeleteUserService {

  private deleteUserUrl =
    'http://' + environment.deleteUser.frontAPIHost + ':' +
    environment.deleteUser.frontAPIPort + '/api/registration/delete';

  constructor(private http: Http) { }

  deleteUser(user: string, token: string): any {
    return this.http
      .get(`${this.deleteUserUrl}/${user}/${token}`)
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

import {Injectable} from '@angular/core';

import {LT_LIST} from '../mock-tests';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

export const LT_EXPLANATIONS = {
  VERB: {
    info: `Hint: `,
    example: `Das Auto`,
    table: {
      gender: 'Neutral',
      type: 'Noun'
    }
  }
};

@Injectable()
export class LtService {

  private hostname = location.hostname;
  private protocol = location.protocol;
  private port = location.port;

  private url = `${this.protocol}//${this.hostname}${this.port ? ':' + this.port : ''}/api`;

  constructor(
    private http: HttpClient
  ) {
  }

  getRandomLT(): Promise<any> {
    return new Promise<any>((res, rej) => {
      this.http.get<any>(this.url + '/lt/random')
        .pipe(
          catchError(this.handleError('getRandomLT', []))
        )
        .subscribe(lt => {
          // complete lt with explanation
          let lt_test = lt.es_resp.hits.hits[0]._source;

          lt_test.text.forEach(word => {
            if (word.isInput) {
              const token = JSON.parse(word.token);
              word['complete'] = true;
              word['explanation'] = LT_EXPLANATIONS.VERB;
              word['explanation'].info = 'Hint: ' + token.lemma_;
            }
          });
          res({
            test: lt_test,
            allText: lt.entire_text
          });
        });
    });
  }

  getTestA2Prep(): Promise<any> {
    return Promise.resolve(LT_LIST[0]);
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

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

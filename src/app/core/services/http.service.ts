import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getStates(term: string): Observable<string[]> {
    return new Observable((observer) => {
      let getStatesNamePromise: Promise<any>;

      getStatesNamePromise = new Promise((resolve) => {
        this.http.get<string[]>('./assets/json/states.json')
         .subscribe((data: any) => {
          resolve(data.states);
        });
      });

      getStatesNamePromise.then((data) => {
        if (term) {
          data = data.filter((x: any) =>
            x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        observer.next(data);
      });
    });
  }
}

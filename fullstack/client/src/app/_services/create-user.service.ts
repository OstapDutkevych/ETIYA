import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserCreate } from '../_models/userCreate';
import { catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private createUserUrl = 'http://localhost:5000/app/save-user';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':  'application/json'})
  };

  constructor(private http: HttpClient) { }


  // createUser (user: UserCreate): Observable<UserCreate> {
  //   return this.http.post<UserCreate>(this.createUserUrl, user, this.httpOptions).pipe(
  //     // tap((newHero: User) => this.log(`added hero w/ id=${newHero.id}`)),
  //     catchError(this.handleError<UserCreate>('addHero'))
  //   );
  // }
  createUser (user: UserCreate): Observable<UserCreate> {
    return this.http.post<UserCreate>(this.createUserUrl, user , this.httpOptions).pipe(
        catchError(this.handleError('saveUser', user))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.message, 'my');

      // this.log(${operation} failed: ${error.message});

      return of(result as T);
      // return throwError(error);
    };
  }
}

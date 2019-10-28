import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserCreate } from '../_models/userCreate';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:5000/app/main';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':  'application/json'})
  };
  constructor(private http: HttpClient) { }

  getUsers(user: UserCreate): Observable<UserCreate> {
    return this.http.get<UserCreate>(this.userUrl)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError('getUser', user))
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



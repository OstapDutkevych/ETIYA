import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { catchError, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:5000/api/auth/login';
  private registerUrl = 'http://localhost:5000/api/auth/register';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,
            private route: Router
    ) { }

    loginData (user: User): Observable<User> {
      return this.http.post<User>(this.loginUrl, user, this.httpOptions).pipe(
        // tap((newHero: User) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<User>('addHero'))
      );
    }
    createData (user: User): Observable<User> {
      return this.http.post<User>(this.registerUrl, user, this.httpOptions).pipe(
        // tap((newHero: User) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<User>('addHero'))
      );
    }
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        console.error(error);
  
        // this.log(${operation} failed: ${error.message});
  
        return of(result as T);
      };
    }
  

}

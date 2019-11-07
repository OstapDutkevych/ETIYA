import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../_models/user";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loginUrl = "http://localhost:5000/api/auth/login";
  private registerUrl = "http://localhost:5000/api/auth/register";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}

  loginData(user: User): Observable<User> {
    return this.http
      .post<User>(this.loginUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>("addHero")));
  }
  createData(user: User): Observable<User> {
    return this.http
      .post<User>(this.registerUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>("addHero")));
  }
  logout(){
    localStorage.removeItem("token");
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.message);
      return throwError(error);
    };
  }
}

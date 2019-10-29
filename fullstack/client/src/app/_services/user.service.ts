import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { UserCreate } from "../_models/userCreate";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private userUrl = "http://localhost:5000/app/main";
  private deleteUserUrl = "http://localhost:5000/app/";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserCreate[]> {
    return this.http.get<UserCreate[]>(this.userUrl);
  }
  deleteUser(user: UserCreate): Observable<UserCreate> {
    const id = user._id;
    const url = `${this.deleteUserUrl}/${id}`; // DELETE api/heroes/42
    return this.http.get<UserCreate>(url, this.httpOptions);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of,Subject } from "rxjs";
import { UserCreate } from "../_models/userCreate";
import { Addresses } from "../_models/userAddresses";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private userUrl = "http://localhost:5000/app/main";
  private deleteUserUrl = "http://localhost:5000/app/delete";
  private updateUserUrl = "http://localhost:5000/app/update";


  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserCreate[]> {
    return this.http.get<UserCreate[]>(this.userUrl);
  }
  deleteUser(user: UserCreate): Observable<UserCreate> {
    const id = user._id;
    const url = `${this.deleteUserUrl}/${id}`; // DELETE 
    return this.http.get<UserCreate>(url, this.httpOptions);
  }
  updateUser(user:UserCreate): Observable<UserCreate>{
    const id = user._id;
    const url = `${this.updateUserUrl}/${id}`;
    return this.http.put<UserCreate>(url, user, this.httpOptions);
  }

}

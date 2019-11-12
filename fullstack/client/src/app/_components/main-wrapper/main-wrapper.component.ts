import { Component, OnInit } from "@angular/core";
import { Store } from '@ngxs/store';
import { LogoutUser } from 'src/store/action/User.action';
import { StateClear } from 'ngxs-reset-plugin';
import { Navigate } from '@ngxs/router-plugin';
@Component({
  selector: "app-main-wrapper",
  templateUrl: "./main-wrapper.component.html",
  styleUrls: ["./main-wrapper.component.css"]
})
export class MainWrapperComponent implements OnInit {
  constructor(
    private store: Store
  ) {}

  ngOnInit() {}

  clearLocalStorage() {
    this.store.dispatch(new LogoutUser());
    this.store.dispatch(new StateClear());
    this.store.dispatch(new Navigate(['/']))
  }
}

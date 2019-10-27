import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.css']
})
export class MainWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clearLocalStorage(){
    window.localStorage.removeItem("token");
  }

}

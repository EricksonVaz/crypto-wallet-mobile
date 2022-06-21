import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showSideMenu = true;
  constructor() {
    console.log("activateRouter",window.location.pathname)
  }

  ngOnInit(): void {
      this.showSideMenu = window.location.pathname.indexOf("tabs") != -1;
  }
}

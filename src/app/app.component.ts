import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { closeLoader, openLoader } from './utils/functions';

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
    openLoader()
    window.addEventListener("load",async ()=>{
      await SplashScreen.hide();
    });
  }
}

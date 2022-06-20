import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  private showSideMenu: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleMenu():void{
    this.showSideMenu = !this.showSideMenu;
    console.log("toogle menu");
    this.subject.next(this.showSideMenu);
  }

  onToggle():Observable<any>{
    return this.subject.asObservable();
  }
}

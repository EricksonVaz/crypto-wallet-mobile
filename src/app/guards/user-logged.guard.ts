import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, getAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {
  constructor(private router:Router,private auth:Auth){
    this.auth = getAuth();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
      const user = this.auth.currentUser;

      //console.log("user logged",user)

      if (user || sessionStorage.getItem("procced")) return true;

      this.router.navigateByUrl('login');
      return false;
  }

}

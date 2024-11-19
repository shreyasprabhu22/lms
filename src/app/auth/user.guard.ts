import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private userswrvice:UserService,private loginservice:LoginService, private router :Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLoggedIn = this.loginservice.get_currentUser() !== null;
      const isUser = this.loginservice.get_role() === 'User';
      console.log(isLoggedIn)
      console.log(isUser)
      if (isLoggedIn && isUser) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}

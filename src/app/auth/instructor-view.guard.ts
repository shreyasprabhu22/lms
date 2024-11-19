import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import {Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class InstructorViewGuard implements CanActivate {

  constructor(private loginservice:LoginService, private router:Router){

  }

  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLoggedIn = this.loginservice.get_currentUser() !== null;
      const isInstructor = this.loginservice.get_role() === 'Instructor';
      console.log(isLoggedIn)
      console.log(isInstructor)
      console.log(this.loginservice.get_role())
      if (isLoggedIn && isInstructor) {
        console.log("here");
        
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}

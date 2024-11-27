// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private loginservice: LoginService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.loginservice.get_currentUser() !== null;
  const isAdmin = this.loginservice.get_role() === 'Admin';
  if (isLoggedIn && isAdmin) {
    return true;
  } else {
    this.router.navigate(['/login']);
    return false;
  }
  }
}

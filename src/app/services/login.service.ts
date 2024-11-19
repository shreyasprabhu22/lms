import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private userStatusSubject = new BehaviorSubject<{ loggedIn: boolean; role: string | null }>({ loggedIn: false, role: null });
  userStatusChange = this.userStatusSubject.asObservable();
  apiUrl = environment.apiUrl;
  currentUser: any = null; 
  role: string = ''; 

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const storedUser = localStorage.getItem('currentUser');
    const storedRole = localStorage.getItem('role');

    if (storedUser && storedRole) {
      this.currentUser = JSON.parse(storedUser);
      this.role = storedRole;
      this.emitUserStatusChange(); 
    }
  }

  
  get_currentUser() {
    return this.currentUser;
  }

  
  get_role() {
    return this.role;
  }

  
  setCurrentUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

 
  setRole(role: string) {
    this.role = role;
    localStorage.setItem('role', role); 
  }

  
  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users/login`, { username, password });
  }

  
  loginInstructor(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/instructors/login`, { username, password });
  }

  logout() {
    this.currentUser = null;
    this.role = '';
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('role'); 
    this.emitUserStatusChange(); 
  }

  private emitUserStatusChange() {
    this.userStatusSubject.next({ loggedIn: this.currentUser !== null, role: this.role });
  }

}

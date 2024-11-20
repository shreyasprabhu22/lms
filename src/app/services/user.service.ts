import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/userInterface';  
import { environment } from '../../environments/environment';
import { Course } from '../interfaces/courseInterface';
import { tap } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,private loginService:LoginService) { }
 
  postData(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/api/users`, data);
  }

  getData(): Observable<User[]> {  
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }
  getOne(id:string): Observable<User> {  
    return this.http.get<User>(`${this.apiUrl}/api/users/${id}`);
  }
  deleteData(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/api/users/${id}`);
  }
  checkUserByEmail(email: string): Observable<{ exists: boolean }> {
    return this.http.post<{ exists: boolean }>(`${this.apiUrl}/api/users/check-email`, { email });
  }
  updatePassword(email: string, password: string): Observable<any> {
    const payload = { email, password };  
    return this.http.put<any>(`${this.apiUrl}/api/users/update-password`, payload);
  }

getCoursesTakenByUser(userId: string): Observable<Course[]> {
  console.log(userId)
  return this.http.get<Course[]>(`${this.apiUrl}/api/users/coursesTaken/${userId}`);
}


updateData(userId: string, updateData: any): Observable<User> {
  console.log("here")
  return this.http.put<User>(`${this.apiUrl}/api/users/${userId}`, updateData).pipe(
    tap(updatedUser => {
      console.log(updatedUser)
      this.loginService.setCurrentUser(updatedUser); 
    })
  );
}
updateCourse(userId: string, updateData: any): Observable<User> {
  console.log("here")
  return this.http.put<User>(`${this.apiUrl}/api/users/updatecourses/${userId}`, updateData).pipe(
        tap(updatedUser => {
          console.log(updatedUser)
          this.loginService.setCurrentUser(updatedUser); 
        })
      );
}

  
}

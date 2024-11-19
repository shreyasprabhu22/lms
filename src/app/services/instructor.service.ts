import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { instructor } from '../interfaces/instructor';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }
  postData(data: instructor): Observable<instructor> {
    return this.http.post<instructor>(`${this.apiUrl}/api/instructors`, data);
  }

  getData(): Observable<instructor[]> {
    return this.http.get<instructor[]>(`${this.apiUrl}/api/instructors`);
  }
  getOne(id:string): Observable<instructor> {
    return this.http.get<instructor>(`${this.apiUrl}/api/instructors/${id}`);
  }

  deleteData(id: string): Observable<instructor> {
    return this.http.delete<instructor>(`${this.apiUrl}/api/instructors/${id}`);
  }
  updateData(instructorId: string, instructorData: instructor): Observable<any> {
    console.log(`${this.apiUrl}/api/instructors/${instructorId}`)
    return this.http.put(`${this.apiUrl}/api/instructors/${instructorId}`, instructorData);
  }
  getInstructorByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/instructors/email/${email}`);
  }
  updatePassword(email: string, newPassword: string): Observable<any> {
    const body = { email, newPassword }; 
    console.log(body)
    return this.http.put(`${this.apiUrl}/api/instructors/update-password`, body);  
  }
}

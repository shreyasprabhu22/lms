import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/courseInterface';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }
  postData(data: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/api/courses`, data);
  }

  getData(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/api/courses`);
  }

  getOne(id:string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/api/courses/${id}`);
  }

  deleteData(id: string): Observable<Course> {
    return this.http.delete<Course>(`${this.apiUrl}/api/courses/${id}`);
  }

  getDataByInstructor(id:string):Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/api/courses/instructor/${id}`)
  }
  getCoursesFromDifferentCategory():Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/api/courses/courses-by-category`)
  }

  updateCourse(courseId: string, courseData: Course): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/courses/${courseId}`, courseData);
  }
}
 
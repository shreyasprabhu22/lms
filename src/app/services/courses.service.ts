import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Course {
  CourseID: string;
  CourseName: string;
  Instructor: string;
  Category: string;
  Duration: string;
  Price: string | number;
  Description: string;
  Image: string;
  IImage: string;
  Rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [];
  private coursesUrl = 'https://672e120c229a881691eed7df.mockapi.io/lms/courses'; 

  constructor(private http: HttpClient) {
    this.loadCourses().subscribe();
  }

  loadCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl).pipe(
      map(response => {
        this.courses = response;
        return this.courses;
      }),
      catchError(error => {
        console.error('Error loading courses', error);
        return of([]); 
      })
    );
  }

  getCoursesByIds(courseIds: string[]): Observable<Course[]> {
    const courses = this.courses.filter(course => courseIds.includes(course.CourseID));
    return of(courses);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl).pipe(
      map(response => {
        this.courses = response;
        return this.courses;
      }),
      catchError(error => {
        console.error('Error loading courses', error);
        return of([]); 
      })
    );
  }
}

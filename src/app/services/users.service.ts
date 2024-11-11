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

export interface User {
  id: string;
  userid: string;
  firstName: string;
  lastName: string;
  email: string;
  degree: string;
  university: string;
  username: string;
  password: string;
  subscription: string;
  CoursesTaken: string[];
} 

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];
  private currentUser: User | null = null;
  private carts: { [username: string]: any[] } = {};
  private usersUrl = 'https://672e120c229a881691eed7df.mockapi.io/lms/users';

  constructor(private http: HttpClient) {
    this.loadUsers().subscribe();
  }

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(response => {
        this.users = response;
        return this.users;
      }),
      catchError(error => {
        console.error('Error fetching users data:', error);
        return of([]);
      })
    );
  }

  authenticateUser(username: string, password: string): User | null {
    const foundUser = this.users.find(user => user.username === username && user.password === password);
    if (foundUser) {
      this.currentUser = foundUser;
      return foundUser;
    } else {
      return null;
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  addCourseToCart(course: any): void {
    if (this.currentUser) {
      const username = this.currentUser.username;
      if (!this.carts[username]) {
        this.carts[username] = [];
      }
      this.carts[username].push(course);
    }
  }

  getCart(): any[] {
    return this.carts[this.currentUser?.username ?? ''] || [];
  }

  removeCourseFromCart(courseId: string): void {
    if (this.currentUser) {
      const username = this.currentUser.username;
      this.carts[username] = this.carts[username].filter(course => course.CourseID !== courseId);
    }
  }

  clearCart(): void {
    if (this.currentUser) {
      const username = this.currentUser.username;
      this.carts[username] = [];
    }
  }

  updateUserCourses(courses: any[]): Observable<User> {
    if (!this.currentUser || !this.currentUser.userid) {
      throw new Error('No authenticated user or user ID is missing');
    }

    const updatedCoursesTaken = [...this.currentUser.CoursesTaken, ...courses.map(course => course.CourseID)];
    const updatedUser = { ...this.currentUser, CoursesTaken: updatedCoursesTaken };

    return this.http.put<User>(`${this.usersUrl}/${this.currentUser.userid}`, updatedUser).pipe(
      map(response => {
        this.currentUser = response;
        return response;
      }),
      catchError(error => {
        console.error('Error updating user courses:', error);
        throw error;
      })
    );
  }

  createUser(userData: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, userData).pipe(
      catchError(error => {
        console.error('Error creating user:', error);
        throw error; 
      })
    );
  }

  updateUserSubscription(subscription: string): Observable<User> {
    if (!this.currentUser || !this.currentUser.userid) {
      throw new Error('No authenticated user or user ID is missing');
    }

    const updatedUser = { ...this.currentUser, subscription };

    return this.http.put<User>(`${this.usersUrl}/${this.currentUser.userid}`, updatedUser).pipe(
      map(response => {
        this.currentUser = response;
        return response;
      }),
      catchError(error => {
        console.error('Error updating user subscription:', error);
        throw error;
      })
    );
  }
}

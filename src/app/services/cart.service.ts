import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(userId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/api/cart/${userId}/courses`);
  }

  addCourseToCart(userId: string, courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/cart/${userId}`, { courseId });
  }

  removeCourseFromCart(userId: string, courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/cart/${userId}/remove`, {
      body: { courseId }
    });
  }

  updateCart(userId: string, courses: any[]): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/api/cart/${userId}`, { courses });
  }

  clearCart(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/cart/${userId}/clear`);
  }
}

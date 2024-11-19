import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/skills/`);
  }
  getFaq(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/faq/`);
  }
  getFeatures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/feature/`);
  }
  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/blogs/upcoming`);
  }
  getPricing(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/pricing/`);
  }
  getCarouselItem(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/carousel/`);
  }
}
 
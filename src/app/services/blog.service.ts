import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { blog } from '../interfaces/blog';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }
  postData(data: blog): Observable<blog> {
    console.log(data)
    return this.http.post<blog>(`${this.apiUrl}/api/blogs`, data);
  }
  getData(): Observable<blog[]> {  
    return this.http.get<blog[]>(`${this.apiUrl}/api/blogs`);
  }
  deleteData(id: string): Observable<blog> {
    return this.http.delete<blog>(`${this.apiUrl}/api/blogs/${id}`);
  }
  getOne(id:string): Observable<blog> {  
    return this.http.get<blog>(`${this.apiUrl}/api/blogs/${id}`);
  }
  updateData(blogId: string, updatedBlog: blog): Observable<blog> {
    return this.http.put<blog>(`${this.apiUrl}/api/blogs/${blogId}`, updatedBlog);
  }

  
}

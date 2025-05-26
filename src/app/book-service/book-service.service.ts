import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBooking(data: any): Observable<any> {
    const token = localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/booking`, data, { headers });
  }
}

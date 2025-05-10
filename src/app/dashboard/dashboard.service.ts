import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<any[]>(`${this.baseUrl}/products`, { headers });
  }

  getServices() {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<any[]>(`${this.baseUrl}/services`, { headers });
  }
}

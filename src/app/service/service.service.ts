import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  createService(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/services`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  createServiceSchedules(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/service-schedule`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getServiceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/services/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/services`, {
      headers: this.getAuthHeaders(),
    });
  }
}

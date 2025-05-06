import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Response } from './user/interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/auth/register`, userData);
  }

  loginUser(userData: any) {
    return this.http.post<Response>(`${this.baseUrl}/auth/login`, userData);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(userData: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  loginUser(userData: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, userData);
  }

}

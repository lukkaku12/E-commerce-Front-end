import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any[]>(`${this.baseUrl}/products/public`, { headers });
  }

  getServices(): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any[]>(`${this.baseUrl}/services`, { headers });
  }

  addToCart(product_id: number): Observable<any> {

    const user = localStorage.getItem('user') || '';
    const userParsed = JSON.parse(user)
    const userId = userParsed.user_id

    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
    productId: product_id,
    quantity: 1,
    }
    console.log(data)
    return this.http.post<any[]>(`${this.baseUrl}/cart-item-id`, data, { headers });
  }

  lookForUserItem(queryTerm: string) {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any[]>(`${this.baseUrl}/products/reference/by-user?reference=${queryTerm}`, { headers });
  }

}

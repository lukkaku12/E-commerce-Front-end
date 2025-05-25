import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data, {
      headers: this.getAuthHeaders()
    });
  }

  createVariants(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/product-variants`, data, {
      headers: this.getAuthHeaders()
    });
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
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getCartItems(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/cart-item-id`, { headers }); // Replace with actual endpoint
  }

  removeFromCart(cartItemId: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/cart-item-id/${cartItemId}`, {headers});
  }

  updateItemQuantity(cartItemId: number, quantity: number) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.baseUrl}/cart-item-id/${cartItemId}`, {quantity}, {headers});
  }
}

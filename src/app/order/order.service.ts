import { Injectable } from '@angular/core';
import { Product } from '../../app/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Pedido {
    id: number;
    produtos: Product[];
  }
@Injectable({
  providedIn: 'root',
})

export class OrderService {

  private apiUrl = 'http://localhost:3001/pedidos';

  constructor(private http: HttpClient) {}

  addPedido(produtos: Product[]): void {
    this.http.post(this.apiUrl, { produtos }).subscribe({
      next: res => console.log('Pedido enviado:', res),
      error: err => console.error('Erro ao enviar pedido:', err)
    });
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<{ pedidos: Pedido[] }>(this.apiUrl)
      .pipe(map(res => res.pedidos));
  }

  removePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  limparPedidos(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}





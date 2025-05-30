import { Injectable } from '@angular/core';
import { Product } from '../../app/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Pedido {
  id: number;
  produtos: Product[];
  nome: string;
  telefone: string;
  data?: string;
  origem?: 'api' | 'local';
}
@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private apiUrl = '/api/pedidos';

  constructor(private http: HttpClient) { }

  addPedido(pedido: { produtos: Product[], nome: string, telefone: string }) {
    return this.http.post('/api/pedidos', pedido);
  }


  getPedidos(): Observable<Pedido[]> {
    return this.http.get<{ pedidos: Pedido[] }>(this.apiUrl).pipe(
      map(response => response.pedidos)
    );
  }


  removePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  limparPedidos(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}





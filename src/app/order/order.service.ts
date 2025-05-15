import { Injectable } from '@angular/core';
import { Product } from '../../app/cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private pedidos: Product[][] = [];

  constructor() {
    const dadosSalvos = localStorage.getItem('pedidos');
    if (dadosSalvos) {
      this.pedidos = JSON.parse(dadosSalvos);
    }
  }

  addPedido(pedido: Product[]) {
    this.pedidos.push(pedido);
    this.salvarNoLocalStorage();
  }

  getPedidos(): Product[][] {
    return this.pedidos;
  }

  private salvarNoLocalStorage() {
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
  }

  limparPedidos() {
    this.pedidos = [];
    localStorage.removeItem('pedidos');
  }

  removePedido(index: number) {
    this.pedidos.splice(index, 1);
    this.salvarNoLocalStorage();
  }
}


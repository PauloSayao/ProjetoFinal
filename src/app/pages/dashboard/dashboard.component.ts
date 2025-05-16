import { Component, OnInit } from '@angular/core';
import { Product } from '../../cart/cart.service';
import { OrderService, Pedido } from '../../order/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadPedidos();
  }
  loadPedidos() {
    this.orderService.getPedidos().subscribe({
      next: dados => this.pedidos = dados,
      error: err => console.error('Erro ao carregar pedidos:', err)
    });
  }
  limparPedidos() {
    this.orderService.limparPedidos().subscribe({
      next: () => this.pedidos = [],
      error: err => console.error('Erro ao limpar pedidos:', err)
    });
  }

  removerPedido(id: number) {
    this.orderService.removePedido(id).subscribe({
      next: () => this.loadPedidos(),
      error: err => console.error('Erro ao remover pedido:', err)
    });
  }
}












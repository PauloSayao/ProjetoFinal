import { Component, OnInit } from '@angular/core';
import { Product } from '../../cart/cart.service';
import { OrderService } from '../../order/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pedidos: Product[][] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.pedidos = this.orderService.getPedidos();
  }
  limparPedidos() {
    this.orderService.limparPedidos();
    this.pedidos = [];
  }
  removerPedido(index: number) {
    this.orderService.removePedido(index);
    this.pedidos = this.orderService.getPedidos();
  }

}

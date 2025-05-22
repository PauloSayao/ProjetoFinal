import { Component, OnInit } from '@angular/core';
import { Product } from '../../cart/cart.service';
import { OrderService, Pedido } from '../../order/order.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.loadPedidos();
  }
  loadPedidos() {
  this.orderService.getPedidos().subscribe({
    next: dados => {
      const pedidosLocais = JSON.parse(localStorage.getItem('pedidosLocais') || '[]') as Pedido[];
      this.pedidos = [...dados, ...pedidosLocais];
      
    },
    error: err => {
      console.error('Erro ao carregar pedidos da API:', err);
      const pedidosLocais = JSON.parse(localStorage.getItem('pedidosLocais') || '[]') as Pedido[];
      this.pedidos = pedidosLocais;
    }
  });
}

  limparPedidos() {
    this.orderService.limparPedidos().subscribe({
      next: () =>  {
        this.pedidos = [];
        localStorage.removeItem('pedidosLocais'); // Limpa local também
      },
      error: err => console.error('Erro ao limpar pedidos:', err)
    });
  }
  removerPedido(id: number) {
    // Primeiro remove localmente, depois API
    const pedidosLocais = JSON.parse(localStorage.getItem('pedidosLocais') || '[]') as Pedido[];
    const indexLocal = pedidosLocais.findIndex(p => p.id === id);
    if (indexLocal > -1) {
      pedidosLocais.splice(indexLocal, 1);
      localStorage.setItem('pedidosLocais', JSON.stringify(pedidosLocais));
      this.loadPedidos(); // Recarrega lista
      return;
    }
     this.orderService.removePedido(id).subscribe({
      next: () => this.loadPedidos(),
      error: err => console.error('Erro ao remover pedido:', err)
    });
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  ToHome() {
    this.router.navigate(['/login']);
  }
  ToOrder() {
    this.router.navigate(['/dashboard']);
  }
  ToConfiguration() {
    this.router.navigate(['/configuracao']);
  }
}

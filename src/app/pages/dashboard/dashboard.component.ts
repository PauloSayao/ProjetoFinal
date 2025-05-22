import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private orderService: OrderService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadPedidos();
  }

  loadPedidos() {
    try {
      // 1. Carrega pedidos locais primeiro
      const pedidosLocais = this.getPedidosLocais();
      
      // 2. Tenta carregar da API
      this.orderService.getPedidos().subscribe({
        next: (dados) => {
          // Combina e remove duplicatas (priorizando API)
          this.pedidos = this.combinarPedidos(pedidosLocais, dados);
          this.cdr.detectChanges(); // Força atualização da view
        },
        error: (err) => {
          console.error('Erro ao carregar pedidos da API:', err);
          this.pedidos = pedidosLocais;
          this.cdr.detectChanges(); // Força atualização da view
        }
      });
    } catch (e) {
      console.error('Erro ao carregar pedidos:', e);
      this.pedidos = [];
      this.cdr.detectChanges();
    }
  }

  private getPedidosLocais(): Pedido[] {
    try {
      return JSON.parse(localStorage.getItem('pedidosLocais') || '[]');
    } catch (e) {
      console.error('Erro ao ler pedidos locais:', e);
      return [];
    }
  }

  private combinarPedidos(locais: Pedido[], api: Pedido[]): Pedido[] {
    // Filtra pedidos locais que não existem na API
    const locaisUnicos = locais.filter(local => 
      !api.some(apiPedido => apiPedido.id === local.id)
    );
    
    return [...locaisUnicos, ...api];
  }

  limparPedidos() {
    this.orderService.limparPedidos().subscribe({
      next: () => {
        this.pedidos = [];
        localStorage.removeItem('pedidosLocais');
        this.cdr.detectChanges();
      },
      error: err => console.error('Erro ao limpar pedidos:', err)
    });
  }

  removerPedido(id: number) {
    // Remove localmente primeiro
    const pedidosLocais = this.getPedidosLocais();
    const updatedLocais = pedidosLocais.filter(p => p.id !== id);
    
    localStorage.setItem('pedidosLocais', JSON.stringify(updatedLocais));
    
    // Tenta remover da API
    this.orderService.removePedido(id).subscribe({
      next: () => this.loadPedidos(),
      error: err => {
        console.error('Erro ao remover da API, mantendo local:', err);
        this.loadPedidos();
      }
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
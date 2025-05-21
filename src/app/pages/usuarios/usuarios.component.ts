import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../cart/cart.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule,RouterModule,MatMenuModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {

  userName: string = '';
  produtos: Product[] = [];
  trufas: string[] = ['trufasmistas.jpg', 'trufasmistas2.jpg', 'trufasrealistas.jpg'];
  currentIndex = 0;
  intervalId: any;
   
  constructor(
    private cartService: CartService, 
    private router: Router, 
    private http: HttpClient
  ) {}
  addToCart(produto: Product) {
    const item: Product = { ...produto, quantity: produto.quantity ?? 1 };
    this.cartService.addToCart(item);
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'Usuário';

    this.http.get<Product[]>('http://localhost:3001/produtos')
    .subscribe((res) => {
      this.produtos = res.filter(p => p.ativo);
    });

    this.intervalId = setInterval(() => {
      this.next();
    }, 4000);


  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.trufas.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.trufas.length) % this.trufas.length;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}

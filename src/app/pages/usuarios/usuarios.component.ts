import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../cart/cart.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule,RouterModule,MatMenuModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  userName: string = '';
  produtos = [
    {
      id: 1,
      name: 'Trufa de Chocolate',
      price: 5.0,
      image: 'trufachocolate.jpg',
      descricao:
        'Deliciosa trufa recheada com ganache de chocolate meio amargo.',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Trufa de Maracujá',
      price: 5.5,
      image: 'trufamaracuja.jpg',
      descricao: 'Trufa cremosa com recheio de maracujá e cobertura branca.',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Trufa de Coco',
      price: 5.0,
      image: 'trufacoco.jpg',
      descricao: 'Recheio de coco com cobertura de chocolate ao leite.',
      quantity: 1,
    },
    // {
    //   id:4,
    //   name: 'Trufa de Limão',
    //   price: 5.50,
    //   image: 'trufalimão.jpg',
    //   descricao: 'Trufa refrescante com recheio de limão siciliano.',
    //   quantity: 1
    // }
  ];

  constructor(private cartService: CartService, private router: Router) {}
  addToCart(produto: Product) {
    const item: Product = { ...produto, quantity: produto.quantity ?? 1 };
    this.cartService.addToCart(item);
  }
  trufas: string[] = [
    'trufasmistas.jpg',
    'trufasmistas2.jpg',
    'trufasrealistas.jpg',
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user);
    this.userName = user.name || 'Usuário';
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

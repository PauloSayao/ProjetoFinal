import { Component } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  produtos = [
    {
      id: 1,
      name: 'Trufa de Chocolate',
      price: 5.00,
      image: 'trufachocolate.jpg',
      descricao: 'Deliciosa trufa recheada com ganache de chocolate meio amargo.',
      quantity: 1
    },
    {
      id: 2,
      name: 'Trufa de Maracujá',
      price: 5.50,
      image: 'trufamaracuja.jpg',
      descricao: 'Trufa cremosa com recheio de maracujá e cobertura branca.',
      quantity: 1
    },
    {
      id: 3,
      name: 'Trufa de Coco',
      price: 5.00,
      image: 'trufacoco.jpg',
      descricao: 'Recheio de coco com cobertura de chocolate ao leite.',
      quantity: 1
    }
  ];

  constructor(private cartService: CartService) {}
  addToCart(produto: any) {
    const item: Product = {
      id: produto.id,
      name: produto.name,
      price: produto.price,
      image: produto.image,
      quantity: produto.quantity ?? 1
    };

    this.cartService.addToCart(item);
  }
  }


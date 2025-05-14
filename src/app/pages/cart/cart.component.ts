import { Component } from '@angular/core';
import { CartService, Product } from '../../cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule]
})

export class CartComponent {
  cartItems: Product[] = [];
  total = 0;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  clear() {
    this.cartService.clearCart();
  }
}

import { Component } from '@angular/core';
import { CartService, Product } from '../../cart/cart.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    CartDialogComponent,
  ],
})
export class CartComponent {
  cartItems: Product[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }
  openCartDialog() {
    this.dialog.open(CartDialogComponent, {
      width: '400px',
      data: this.cartItems
    });
  }
  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  clear() {
    this.cartService.clearCart();
  }
  goToCart() {
    this.router.navigate(['/cart']); // ajuste conforme a rota que você configurou
  }
}

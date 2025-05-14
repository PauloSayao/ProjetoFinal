import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService, Product } from '../../cart/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  imports: [CommonModule],
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public cartItems: Product[],
    private cartService: CartService,
    public dialogRef: MatDialogRef<CartDialogComponent>
  ) {}

  get total() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartService.getCartItems();
  }

  clear() {
    this.cartService.clearCart();
    this.dialogRef.close();
  }
}

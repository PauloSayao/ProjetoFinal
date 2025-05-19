import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService, Product } from '../../cart/cart.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../order/order.service';
@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  imports: [CommonModule],
  styleUrls: ['./cart-dialog.component.scss'],
})
export class CartDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public cartItems: Product[],
    private cartService: CartService,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<CartDialogComponent>
  ) {}

  get total() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  addItem(id: number) {
    const item = this.cartItems.find((p) => p.id === id);
    if (item) {
      this.cartService.addToCart(item);
      this.cartItems = this.cartService.getCartItems();
    }
  }

  removeItem(id: number) {
    const item = this.cartItems.find((p) => p.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.updateCart(this.cartItems);
    } else {
      this.cartService.removeFromCart(id);
    }
    this.cartItems = this.cartService.getCartItems();
  }

  clear() {
    this.cartService.clearCart();
    this.dialogRef.close();
  }
  pedidosRecebidos: Product[][] = [];

  finalizarCompra() {
    this.orderService.addPedido([...this.cartItems]);
    this.clear();
  }
}

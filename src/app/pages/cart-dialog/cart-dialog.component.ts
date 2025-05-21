import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService, Product } from '../../cart/cart.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../order/order.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  imports: [CommonModule,MatSnackBarModule],
  styleUrls: ['./cart-dialog.component.scss'],
})
export class CartDialogComponent {
  user: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public cartItems: Product[],
    private cartService: CartService,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<CartDialogComponent>,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

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
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    const pedido = {
      produtos: [...this.cartItems],
      nome: user.name || '',
      telefone: user.telephone || ''
    };
  
    console.log('Pedido a ser enviado:', pedido)

    this.orderService.addPedido(pedido).subscribe({
      next: () => {
        this.clear();
        this.snackBar.open('Compra finalizada com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        console.error('Erro ao enviar pedido:', err);
        this.snackBar.open('Erro ao finalizar compra.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }
  
}

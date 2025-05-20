import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  descricao: string; 
  image: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = new BehaviorSubject<Product[]>([]);
  cart$ = this.items.asObservable();

  getCartItems() {
    return this.items.value;
  }

  updateCart(newCart: Product[]) {
    this.items.next([...newCart]);
  }

  addToCart(product: Product) {
    const current = this.items.value;
    const existing = current.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      current.push({ ...product, quantity: 1 });
    }

    this.items.next([...current]);
  }

  removeFromCart(id: number) {
    const updated = this.items.value.filter(item => item.id !== id);
    this.items.next(updated);
  }

  clearCart() {
    this.items.next([]);
  }

  getTotal() {
    return this.items.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

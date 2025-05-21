import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatSnackBarModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  userName: string = 'Usuário';
  produtos: Product[] = [];
  loading: boolean = true;

  // Carrossel de imagens
  trufas: string[] = [
    'trufasmistas.jpg',
    'trufasmistas2.jpg',
    'trufasrealistas.jpg',
  ];
  currentIndex = 0;
  intervalId: any;

  // Dados mockados como fallback
  private fallbackProducts: Product[] = [
    {
      id: 1,
      name: 'Trufa de Chocolate',
      price: 5.0,
      image: 'trufachocolate.jpg',
      descricao:
        'Deliciosa trufa recheada com ganache de chocolate meio amargo.',
      quantity: 1,
      ativo: true,
    },
    {
      id: 2,
      name: 'Trufa de Maracujá',
      price: 5.5,
      image: 'trufamaracuja.jpg',
      descricao: 'Trufa cremosa com recheio de maracujá e cobertura branca.',
      quantity: 1,
      ativo: true,
    },
    {
      id: 3,
      name: 'Trufa de Coco',
      price: 5.0,
      image: 'trufacoco.jpg',
      descricao: 'Recheio de coco com cobertura de chocolate ao leite.',
      quantity: 1,
      ativo: true,
    },
    {
      id: 4,
      name: 'Trufa de Limão',
      price: 5.5,
      image: 'trufalimão.jpg',
      descricao: 'Trufa refrescante com recheio de limão siciliano.',
      quantity: 1,
      ativo: false,
    },
    {
      id: 5,
      name: 'Trufa de Morango',
      price: 5.5,
      image: 'trufamorango.jpg',
      descricao:
        'Trufa com recheio de morango e cobertura de chocolate ao leite.',
      quantity: 1,
      ativo: false,
    },
  ];

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadProducts();
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private loadUserData() {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user.name || 'Usuário';
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }

  private loadProducts() {
    this.http.get<Product[]>('/api/produtos').subscribe({
      next: (res) => {
        this.produtos = res.filter((p) => p.ativo);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos, usando fallback:', err);
        this.produtos = this.fallbackProducts;
        this.loading = false;
        this.snackBar.open(
          'Erro ao carregar produtos. Mostrando dados locais.',
          'Fechar',
          {
            duration: 5000,
            panelClass: ['error-snackbar'],
          }
        );
      },
    });
  }

  private startCarousel() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 4000);
  }

  addToCart(produto: Product) {
    const item: Product = { ...produto, quantity: produto.quantity ?? 1 };
    this.cartService.addToCart(item);
    this.snackBar.open(`${produto.name} adicionado ao carrinho!`, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
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

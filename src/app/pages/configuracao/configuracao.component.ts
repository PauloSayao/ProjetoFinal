import { Component, OnInit } from '@angular/core';
  import { HttpClient, HttpClientModule } from '@angular/common/http';
  import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
  
interface Produto {
  id: number;
  name: string;
  price: number;
  image: string;
  descricao: string;
  quantity: number;
  ativo: boolean;
}
  
  @Component({
    selector: 'app-configuracao',
    standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule,FormsModule],
    templateUrl: './configuracao.component.html',
    styleUrls: ['./configuracao.component.scss'],
  })
  export class ConfiguracaoComponent implements OnInit {
    produtos: Produto[] = [];
    novoProduto: Partial<Produto> = {};
  
    constructor(private http: HttpClient,private router :Router) {}
    
    ativarOuDesativarProduto(id: number) {
      this.http.patch(`http://localhost:3001/produtos/${id}`, {}).subscribe({
        next: () => this.carregarProdutos(),
        error: (err) => console.error('Erro ao alterar produto', err),
      });
    }
    ngOnInit() {
      this.carregarProdutos();
    }
  
    carregarProdutos() {
      this.http.get<Produto[]>('http://localhost:3001/produtos').subscribe({
        next: (data) => this.produtos = data,
        error: (err) => console.error('Erro ao buscar produtos', err),
      });
    }
  
    removerProduto(id: number) {
      this.http.delete(`http://localhost:3001/produtos/${id}`).subscribe({
        next: () => this.carregarProdutos(),
        error: (err) => console.error('Erro ao remover produto', err),
      });
    }
  
    adicionarProduto() {
      this.http.post('http://localhost:3001/produtos', this.novoProduto).subscribe({
        next: () => {
          this.novoProduto = {};
          this.carregarProdutos();
        },
        error: (err) => console.error('Erro ao adicionar produto', err),
      });
    }
    logout() {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
    ToHome(){
      this.router.navigate(['/login']);
    }
    ToOrder(){
      this.router.navigate(['/dashboard']);
    }
    ToConfiguration(){
      this.router.navigate(['/configuracao']);
    }
  }
  

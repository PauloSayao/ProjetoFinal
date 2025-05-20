import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isRegistering = false;
  isLoading = false; // Adicionado estado de loading
  errorMessage = ''; // Para feedback de erros


 // Campos para login
 loginForm = {
  name: '',
  password: ''
};

// Campos para registro
registerForm = {
  name: '',
  fullName: '',
  email: '',
  password: '',
  telephone: '',
  consentLGPD: false
};


  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }

  login() {
    if (!this.loginForm.name || !this.loginForm.password) {
      this.errorMessage = 'Preencha todos os campos';
      return;
    }

    this.isLoading = true;

    this.http.post<any>(`${environment.apiUrl}/login`, {
      name: this.loginForm.name,
      password: this.loginForm.password
    }).subscribe({
      next: (res) => {
        this.authService.setCurrentUser(res);
        localStorage.setItem('user', JSON.stringify(res));

        const redirect = res.role === 'admin' ? '/dashboard' : '/usuarios';
        this.router.navigate([redirect]);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao fazer login. Verifique suas credenciais.';
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    });
  }

  register() {
    if (!this.registerForm.consentLGPD) {
      this.errorMessage = 'Você deve aceitar a política de privacidade (LGPD).';
      return;
    }

    const { consentLGPD, ...formData } = this.registerForm;

    this.isLoading = true;

    this.http.post<any>(`${environment.apiUrl}/register`, formData)
      .subscribe({
        next: (res) => {
          alert('Cadastro realizado com sucesso!');
          this.toggleMode();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao cadastrar. Tente novamente.';
        },
        complete: () => this.isLoading = false
      });
  }
}
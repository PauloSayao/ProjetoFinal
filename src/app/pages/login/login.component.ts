import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRegistering = false;
  isLoading = false;
  errorMessage = '';

  // Form models
  loginForm = {
    name: '',
    password: ''
  };

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

  // Public methods
  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
    this.resetForms();
  }

  login(): void {
    if (!this.validateLoginForm()) return;

    this.isLoading = true;
    this.errorMessage = '';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<any>(
      `${environment.apiUrl}/login`,
      {
        name: this.loginForm.name,
        password: this.loginForm.password
      },
      httpOptions
    ).subscribe({
      next: (res) => this.handleLoginSuccess(res),
      error: (err) => this.handleError(err),
      complete: () => this.isLoading = false
    });
  }

  register(): void {
    if (!this.validateRegisterForm()) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { consentLGPD, ...formData } = this.registerForm;

    this.http.post<any>(`${environment.apiUrl}/register`, formData)
      .subscribe({
        next: () => this.handleRegisterSuccess(),
        error: (err) => this.handleError(err),
        complete: () => this.isLoading = false
      });
  }

  // Private methods
  private resetForms(): void {
    if (!this.isRegistering) {
      this.registerForm = {
        name: '',
        fullName: '',
        email: '',
        password: '',
        telephone: '',
        consentLGPD: false
      };
    } else {
      this.loginForm = { name: '', password: '' };
    }
  }

  private validateLoginForm(): boolean {
    if (!this.loginForm.name || !this.loginForm.password) {
      this.errorMessage = 'Preencha todos os campos';
      return false;
    }
    return true;
  }

  private handleLoginSuccess(response: any): void {
    this.authService.setCurrentUser(response);
    localStorage.setItem('user', JSON.stringify(response));

    const redirect = response.role === 'admin' ? '/dashboard' : '/usuarios';
    this.router.navigate([redirect]);
  }

  private validateRegisterForm(): boolean {
    if (!this.registerForm.consentLGPD) {
      this.errorMessage = 'Você deve aceitar a política de privacidade (LGPD).';
      return false;
    }

    const requiredFields = ['name', 'email', 'password', 'telephone'];
    for (const field of requiredFields) {
      if (!this.registerForm[field as keyof typeof this.registerForm]) {
        this.errorMessage = 'Preencha todos os campos obrigatórios';
        return false;
      }
    }

    if (!this.isValidEmail(this.registerForm.email)) {
      this.errorMessage = 'Por favor, insira um e-mail válido';
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private handleRegisterSuccess(): void {
    alert('Cadastro realizado com sucesso!');
    this.toggleMode();
  }

  private handleError(error: any): void {
    this.errorMessage = error.error?.message || 
      (this.isRegistering ? 'Erro ao cadastrar. Tente novamente.' : 'Erro ao fazer login. Verifique suas credenciais.');
    this.isLoading = false;
  }
}
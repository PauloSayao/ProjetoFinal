import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isRegistering = false;

  // Campos para login
  name = '';
  password = '';

  // Campos para registro
  registerName = '';
  fullName = '';
  registerEmail = '';
  registerPassword = '';
  registerTelephone = '';
  consentLGPD = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  toggleMode() {
    this.isRegistering = !this.isRegistering;
  }

  login() {

    this.http
      .post<any>('http://localhost:3001/login', {
        name: this.name,
        password: this.password,
      })

      .subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          if (res.role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/usuarios']);
          }
        },

        error: (err) => {
          alert(err.error.message || 'Erro ao fazer login.');
        },

      });
  }

  register() {
    if (!this.consentLGPD) {
      alert('Você deve aceitar a política de privacidade (LGPD).');
      return;
    }

    this.http
      .post<any>('http://localhost:3001/register', {
        name: this.registerName,
        fullName: this.fullName,
        email: this.registerEmail,
        password: this.registerPassword,
        telephone: this.registerTelephone
      })

      .subscribe({
        next: (res) => {
          alert('Cadastro realizado com sucesso!');
          this.toggleMode(); // volta para login
        },

        error: (err) => {
          alert(err.error.message || 'Erro ao cadastrar.');
        },
      });
  }
}

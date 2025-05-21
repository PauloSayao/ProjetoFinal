import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

// Dados mockados
const users = [
  { name: "admin", password: "123456", role: "admin", email: "admin@email.com", telephone: "123456789" },
  { name: "user", password: "123456", role: "user", email: "user@email.com", telephone: "987654321" }
];

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
    // Verificação nos dados mockados
    const user = users.find(u => u.name === this.name && u.password === this.password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/usuarios']);
      }
    } else {
      alert('Usuário ou senha incorretos.');
    }
  }

  register() {
    if (!this.consentLGPD) {
      alert('Você deve aceitar a política de privacidade (LGPD).');
      return;
    }

    // Verifica se o usuário já existe
    const userExists = users.some(u => u.name === this.registerName || u.email === this.registerEmail);

    if (userExists) {
      alert('Nome de usuário ou email já cadastrado.');
      return;
    }

    // Adiciona novo usuário ao array mockado
    const newUser = {
      name: this.registerName,
      password: this.registerPassword,
      role: 'user',
      email: this.registerEmail,
      telephone: this.registerTelephone,
      fullName: this.fullName
    };

    users.push(newUser);

    alert('Cadastro realizado com sucesso!');
    this.toggleMode(); // volta para login
  }
}
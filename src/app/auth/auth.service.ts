import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {
  userData: any = null;
  constructor(private http: HttpClient, private router: Router) {}
  login(name: string, password: string) {
    return this.http.post<any>('/api/login', { name, password }).subscribe({
      next: (res) => {
        this.userData = res;
        localStorage.setItem('user', JSON.stringify(res));

        if (res.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/usuarios']);
        }
      },
      error: (err) => {
        alert(err.error.message || 'Erro ao fazer login');
      }
    });
  }

  getUser() {
    return this.userData || JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    this.userData = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}


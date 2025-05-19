import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })

export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.auth.getUser();
    console.log('GUARD:', user);
    if (user && user.role === 'admin') {
      return true;
    }

    this.router.navigate(['/usuarios']);
    return false;
  }
}

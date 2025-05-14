import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

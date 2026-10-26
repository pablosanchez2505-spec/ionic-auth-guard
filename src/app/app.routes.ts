import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

/**
 * Enrutamiento modular (CE 1.c):
 * - Cada página se carga de forma diferida (lazy loading) con loadComponent.
 * - La ruta /admin está protegida por el Functional Guard authGuard (CE 1.d).
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/admin.page').then((m) => m.AdminPage),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

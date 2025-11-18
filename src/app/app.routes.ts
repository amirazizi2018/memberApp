import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'resolutions',
    canActivate: [AuthGuard],
    loadComponent: () => import('./resolutions/list/list.page').then(m => m.ListPage),
  },
  {
    path: 'resolution/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./resolutions/detail/detail.page').then(m => m.DetailPage),
  },
];


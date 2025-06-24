import { Routes } from '@angular/router';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./login.component')},
  {path: 'home', loadComponent: () => import('./home.component'), canActivate: [authGuard]},
  {path: 'profile', loadComponent: () => import('./profile.component'), canActivate: [authGuard]},
  {path: 'auth', component: MsalRedirectComponent}
];

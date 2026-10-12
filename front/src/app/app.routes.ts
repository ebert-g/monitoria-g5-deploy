import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout';
import { Dashboard } from './core/dashboard/dashboard';
import { Login } from './pessoas-acesso/login/login';
import { authGuard } from './pessoas-acesso/guards/auth.guard';
import { perfilGuard } from './pessoas-acesso/guards/perfil.guard';

const somenteAdministrador = perfilGuard('ADMINISTRADOR');

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: Dashboard, pathMatch: 'full' },
      {
        path: '',
        canActivate: [somenteAdministrador],
        loadChildren: () =>
          import('./estrutura-academica/estrutura-academica.routes').then(
            m => m.estruturaAcademicaRoutes
          )
      },
      {
        path: '',
        canActivate: [somenteAdministrador],
        loadChildren: () =>
          import('./pessoas-acesso/pessoas-acesso.routes').then(m => m.pessoasAcessoRoutes)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

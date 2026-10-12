import { Routes } from '@angular/router';

export const pessoasAcessoRoutes: Routes = [
  {
    path: 'docentes',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/docente-consulta/docente-consulta').then(m => m.DocenteConsulta)
      },
      {
        path: 'novo',
        loadComponent: () => import('./pages/docente-form/docente-form').then(m => m.DocenteForm)
      },
      {
        path: ':id/editar',
        loadComponent: () => import('./pages/docente-form/docente-form').then(m => m.DocenteForm)
      },
      {
        path: ':id/acesso',
        data: { tipo: 'docente' },
        loadComponent: () => import('./pages/acesso-form/acesso-form').then(m => m.AcessoForm)
      }
    ]
  },
  {
    path: 'discentes',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/discente-consulta/discente-consulta').then(m => m.DiscenteConsulta)
      },
      {
        path: 'novo',
        loadComponent: () =>
          import('./pages/discente-form/discente-form').then(m => m.DiscenteForm)
      },
      {
        path: ':id/editar',
        loadComponent: () =>
          import('./pages/discente-form/discente-form').then(m => m.DiscenteForm)
      },
      {
        path: ':id/acesso',
        data: { tipo: 'discente' },
        loadComponent: () => import('./pages/acesso-form/acesso-form').then(m => m.AcessoForm)
      }
    ]
  }
];

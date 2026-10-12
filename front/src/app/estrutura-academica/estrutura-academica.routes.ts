import { Routes } from '@angular/router';

export const estruturaAcademicaRoutes: Routes = [
  {
    path: 'ies',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/ies-consulta/ies-consulta').then(m => m.IesConsulta)
      },
      {
        path: 'novo',
        loadComponent: () => import('./pages/ies-form/ies-form').then(m => m.IesForm)
      },
      {
        path: ':id/editar',
        loadComponent: () => import('./pages/ies-form/ies-form').then(m => m.IesForm)
      }
    ]
  },
  {
    path: 'centros-academicos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/centro-academico-consulta/centro-academico-consulta').then(
            m => m.CentroAcademicoConsulta
          )
      },
      {
        path: 'novo',
        loadComponent: () =>
          import('./pages/centro-academico-form/centro-academico-form').then(
            m => m.CentroAcademicoForm
          )
      },
      {
        path: ':id/editar',
        loadComponent: () =>
          import('./pages/centro-academico-form/centro-academico-form').then(
            m => m.CentroAcademicoForm
          )
      }
    ]
  },
  {
    path: 'cursos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/curso-consulta/curso-consulta').then(m => m.CursoConsulta)
      },
      {
        path: 'novo',
        loadComponent: () => import('./pages/curso-form/curso-form').then(m => m.CursoForm)
      },
      {
        path: ':id/editar',
        loadComponent: () => import('./pages/curso-form/curso-form').then(m => m.CursoForm)
      }
    ]
  }
];

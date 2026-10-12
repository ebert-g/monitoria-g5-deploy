import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Perfil } from '../services/auth.service';

export const perfilGuard = (...perfis: Perfil[]): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.possuiPerfil(perfis) || router.createUrlTree(['/']);
};
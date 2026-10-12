import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificacaoService } from '../../shared/notificacao.service';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const notificacao = inject(NotificacaoService);

  const token = auth.obterToken();
  const protegida = token !== null && req.url.startsWith('/api/') && !req.url.startsWith('/api/auth/');
  const requisicao = protegida
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(requisicao).pipe(
    catchError((erro: HttpErrorResponse) => {
      if (protegida && erro.status === 401) {
        auth.sair();
        router.navigate(['/login']);
      } else if (protegida && erro.status === 403) {
        notificacao.exibir('Você não tem permissão para esta ação.');
      }
      return throwError(() => erro);
    })
  );
};

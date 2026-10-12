import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';
import { ConfirmacaoDialog, DadosConfirmacao } from './confirmacao-dialog';

@Injectable({ providedIn: 'root' })
export class ConfirmacaoService {
  private readonly dialog = inject(MatDialog);

  confirmar(dados: DadosConfirmacao): Observable<true> {
    return this.dialog
      .open<ConfirmacaoDialog, DadosConfirmacao, boolean>(ConfirmacaoDialog, {
        data: dados,
        width: '560px',
        maxWidth: '90vw'
      })
      .afterClosed()
      .pipe(filter((confirmado): confirmado is true => confirmado === true));
  }
}

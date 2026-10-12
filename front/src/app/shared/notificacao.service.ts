import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
  private readonly snackBar = inject(MatSnackBar);

  exibir(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', { duration: 5000 });
  }
}

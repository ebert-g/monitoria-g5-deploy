import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { BuscaPorId } from '../../../shared/busca-por-id/busca-por-id';
import { ConfirmacaoService } from '../../../shared/confirmacao/confirmacao.service';
import { lerId } from '../../../shared/id-da-rota';
import { NotificacaoService } from '../../../shared/notificacao.service';
import { StatusChip } from '../../../shared/status-chip/status-chip';
import { Docente } from '../../models/pessoa.model';
import { DocenteService } from '../../services/docente.service';

@Component({
  selector: 'app-docente-consulta',
  imports: [DatePipe, RouterLink, MatButtonModule, MatIconModule, BuscaPorId, StatusChip],
  templateUrl: './docente-consulta.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocenteConsulta {
  private readonly service = inject(DocenteService);
  private readonly router = inject(Router);
  private readonly confirmacao = inject(ConfirmacaoService);
  private readonly notificacao = inject(NotificacaoService);

  readonly id = input<string>();

  protected readonly registro = signal<Docente | null>(null);
  protected readonly carregando = signal(false);
  protected readonly erro = signal<string | null>(null);

  constructor() {
    effect(() => {
      const id = lerId(this.id());
      if (id === null) {
        this.registro.set(null);
        this.erro.set(null);
        return;
      }
      this.carregar(id);
    });
  }

  protected buscar(id: number) {
    this.router.navigate(['/docentes'], { queryParams: { id } });
  }

  protected inativar(docente: Docente) {
    this.confirmacao
      .confirmar({
        titulo: 'Inativar docente?',
        mensagem: `O docente ${docente.nomeCompleto} será inativado. Cadastros com histórico não são excluídos, apenas inativados.`,
        confirmar: 'Inativar'
      })
      .pipe(switchMap(() => this.service.inativar(docente.id)))
      .subscribe({
        next: () => {
          this.notificacao.exibir('Docente inativado.');
          this.carregar(docente.id);
        },
        error: () => this.notificacao.exibir('Não foi possível inativar o docente.')
      });
  }

  private carregar(id: number) {
    this.carregando.set(true);
    this.erro.set(null);

    this.service.buscarPorId(id).subscribe({
      next: docente => {
        this.registro.set(docente);
        this.carregando.set(false);
      },
      error: () => {
        this.registro.set(null);
        this.carregando.set(false);
        this.erro.set('Não foi possível localizar o docente com o ID informado.');
      }
    });
  }
}

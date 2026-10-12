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
import { Ies } from '../../models/estrutura-academica.model';
import { IesService } from '../../services/ies.service';

@Component({
  selector: 'app-ies-consulta',
  imports: [RouterLink, MatButtonModule, MatIconModule, BuscaPorId, StatusChip],
  templateUrl: './ies-consulta.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IesConsulta {
  private readonly service = inject(IesService);
  private readonly router = inject(Router);
  private readonly confirmacao = inject(ConfirmacaoService);
  private readonly notificacao = inject(NotificacaoService);

  readonly id = input<string>();

  protected readonly registro = signal<Ies | null>(null);
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
    this.router.navigate(['/ies'], { queryParams: { id } });
  }

  protected inativar(ies: Ies) {
    this.confirmacao
      .confirmar({
        titulo: 'Inativar instituição?',
        mensagem: `A instituição ${ies.sigla} será inativada. Cadastros com histórico não são excluídos, apenas inativados.`,
        confirmar: 'Inativar'
      })
      .pipe(switchMap(() => this.service.inativar(ies.id)))
      .subscribe({
        next: () => {
          this.notificacao.exibir('Instituição inativada.');
          this.carregar(ies.id);
        },
        error: () => this.notificacao.exibir('Não foi possível inativar a instituição.')
      });
  }

  private carregar(id: number) {
    this.carregando.set(true);
    this.erro.set(null);

    this.service.buscarPorId(id).subscribe({
      next: ies => {
        this.registro.set(ies);
        this.carregando.set(false);
      },
      error: () => {
        this.registro.set(null);
        this.carregando.set(false);
        this.erro.set('Não foi possível localizar a instituição com o ID informado.');
      }
    });
  }
}

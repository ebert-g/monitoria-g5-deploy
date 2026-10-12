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
import { CentroAcademico } from '../../models/estrutura-academica.model';
import { CentroAcademicoService } from '../../services/centro-academico.service';

@Component({
  selector: 'app-centro-academico-consulta',
  imports: [DatePipe, RouterLink, MatButtonModule, MatIconModule, BuscaPorId, StatusChip],
  templateUrl: './centro-academico-consulta.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CentroAcademicoConsulta {
  private readonly service = inject(CentroAcademicoService);
  private readonly router = inject(Router);
  private readonly confirmacao = inject(ConfirmacaoService);
  private readonly notificacao = inject(NotificacaoService);

  readonly id = input<string>();

  protected readonly registro = signal<CentroAcademico | null>(null);
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
    this.router.navigate(['/centros-academicos'], { queryParams: { id } });
  }

  protected inativar(centro: CentroAcademico) {
    this.confirmacao
      .confirmar({
        titulo: 'Inativar centro acadêmico?',
        mensagem: `O centro acadêmico ${centro.nome} será inativado. Cadastros com histórico não são excluídos, apenas inativados.`,
        confirmar: 'Inativar'
      })
      .pipe(switchMap(() => this.service.inativar(centro.id)))
      .subscribe({
        next: () => {
          this.notificacao.exibir('Centro acadêmico inativado.');
          this.carregar(centro.id);
        },
        error: () => this.notificacao.exibir('Não foi possível inativar o centro acadêmico.')
      });
  }

  private carregar(id: number) {
    this.carregando.set(true);
    this.erro.set(null);

    this.service.buscarPorId(id).subscribe({
      next: centro => {
        this.registro.set(centro);
        this.carregando.set(false);
      },
      error: () => {
        this.registro.set(null);
        this.carregando.set(false);
        this.erro.set('Não foi possível localizar o centro acadêmico com o ID informado.');
      }
    });
  }
}

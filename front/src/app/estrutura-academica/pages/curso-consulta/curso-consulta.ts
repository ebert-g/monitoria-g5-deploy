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
import { Curso } from '../../models/estrutura-academica.model';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-curso-consulta',
  imports: [DatePipe, RouterLink, MatButtonModule, MatIconModule, BuscaPorId, StatusChip],
  templateUrl: './curso-consulta.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursoConsulta {
  private readonly service = inject(CursoService);
  private readonly router = inject(Router);
  private readonly confirmacao = inject(ConfirmacaoService);
  private readonly notificacao = inject(NotificacaoService);

  readonly id = input<string>();

  protected readonly registro = signal<Curso | null>(null);
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
    this.router.navigate(['/cursos'], { queryParams: { id } });
  }

  protected inativar(curso: Curso) {
    this.confirmacao
      .confirmar({
        titulo: 'Inativar curso?',
        mensagem: `O curso ${curso.descricao} será inativado. Cadastros com histórico não são excluídos, apenas inativados.`,
        confirmar: 'Inativar'
      })
      .pipe(switchMap(() => this.service.inativar(curso.id)))
      .subscribe({
        next: () => {
          this.notificacao.exibir('Curso inativado.');
          this.carregar(curso.id);
        },
        error: () => this.notificacao.exibir('Não foi possível inativar o curso.')
      });
  }

  private carregar(id: number) {
    this.carregando.set(true);
    this.erro.set(null);

    this.service.buscarPorId(id).subscribe({
      next: curso => {
        this.registro.set(curso);
        this.carregando.set(false);
      },
      error: () => {
        this.registro.set(null);
        this.carregando.set(false);
        this.erro.set('Não foi possível localizar o curso com o ID informado.');
      }
    });
  }
}

import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { lerId } from '../../../shared/id-da-rota';
import { NotificacaoService } from '../../../shared/notificacao.service';
import { DocenteService } from '../../services/docente.service';

@Component({
  selector: 'app-docente-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './docente-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocenteForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(DocenteService);
  private readonly notificacao = inject(NotificacaoService);

  readonly id = input<string>();

  protected readonly idRegistro = computed(() => lerId(this.id()));
  protected readonly modoEdicao = computed(() => this.id() !== undefined);
  protected readonly salvando = signal(false);
  protected readonly erroCarga = signal<string | null>(null);

  protected readonly formulario = this.fb.group({
    centroAcademicoId: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
    matricula: ['', Validators.required],
    nomeCompleto: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', Validators.required]
  });

  constructor() {
    effect(() => {
      if (!this.modoEdicao()) return;

      this.formulario.controls.centroAcademicoId.disable();
      this.formulario.controls.matricula.disable();
      const id = this.idRegistro();
      if (id === null) {
        this.erroCarga.set('ID inválido.');
        return;
      }
      this.carregar(id);
    });
  }

  protected salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.salvando.set(true);
    const { centroAcademicoId, ...dados } = this.formulario.getRawValue();
    const id = this.idRegistro();
    const requisicao =
      id === null
        ? this.service.cadastrar(Number(centroAcademicoId), dados)
        : this.service.editar(id, dados);

    requisicao.subscribe({
      next: docente => {
        this.notificacao.exibir('Docente salvo com sucesso.');
        this.router.navigate(['/docentes'], { queryParams: { id: docente.id } });
      },
      error: () => {
        this.salvando.set(false);
        this.notificacao.exibir('Não foi possível salvar o docente. Verifique os dados.');
      }
    });
  }

  private carregar(id: number) {
    this.erroCarga.set(null);
    this.service.buscarPorId(id).subscribe({
      next: docente => this.formulario.patchValue(docente),
      error: () => this.erroCarga.set('Não foi possível carregar o docente.')
    });
  }
}

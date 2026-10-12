import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { lerId } from '../../../shared/id-da-rota';
import { NotificacaoService } from '../../../shared/notificacao.service';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-curso-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './curso-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursoForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(CursoService);
  private readonly notificacao = inject(NotificacaoService);

  readonly id = input<string>();

  protected readonly turnos = ['Matutino', 'Vespertino', 'Noturno', 'Integral'];

  protected readonly idRegistro = computed(() => lerId(this.id()));
  protected readonly modoEdicao = computed(() => this.id() !== undefined);
  protected readonly salvando = signal(false);
  protected readonly erroCarga = signal<string | null>(null);

  protected readonly formulario = this.fb.group({
    centroAcademicoId: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
    sigla: ['', Validators.required],
    descricao: ['', Validators.required],
    coordenador: ['', Validators.required],
    turnos: this.fb.control<string[]>([], Validators.required)
  });

  constructor() {
    effect(() => {
      if (!this.modoEdicao()) return;

      this.formulario.controls.centroAcademicoId.disable();
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
      next: curso => {
        this.notificacao.exibir('Curso salvo com sucesso.');
        this.router.navigate(['/cursos'], { queryParams: { id: curso.id } });
      },
      error: () => {
        this.salvando.set(false);
        this.notificacao.exibir('Não foi possível salvar o curso. Verifique os dados.');
      }
    });
  }

  private carregar(id: number) {
    this.erroCarga.set(null);
    this.service.buscarPorId(id).subscribe({
      next: curso =>
        this.formulario.patchValue({ ...curso, centroAcademicoId: curso.centroAcademico.id }),
      error: () => this.erroCarga.set('Não foi possível carregar o curso.')
    });
  }
}

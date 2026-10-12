import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { lerId } from '../../../shared/id-da-rota';
import { NotificacaoService } from '../../../shared/notificacao.service';
import { CentroAcademicoService } from '../../services/centro-academico.service';

@Component({
  selector: 'app-centro-academico-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './centro-academico-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CentroAcademicoForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(CentroAcademicoService);
  private readonly notificacao = inject(NotificacaoService);

  readonly id = input<string>();

  protected readonly idRegistro = computed(() => lerId(this.id()));
  protected readonly modoEdicao = computed(() => this.id() !== undefined);
  protected readonly salvando = signal(false);
  protected readonly erroCarga = signal<string | null>(null);

  protected readonly formulario = this.fb.group({
    iesId: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
    nome: ['', Validators.required],
    coordenador: ['', Validators.required],
    emailCentral: ['', [Validators.required, Validators.email]],
    telefoneCentral: ['', Validators.required]
  });

  constructor() {
    effect(() => {
      if (!this.modoEdicao()) return;

      this.formulario.controls.iesId.disable();
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
    const { iesId, ...dados } = this.formulario.getRawValue();
    const id = this.idRegistro();
    const requisicao =
      id === null ? this.service.cadastrar(Number(iesId), dados) : this.service.editar(id, dados);

    requisicao.subscribe({
      next: centro => {
        this.notificacao.exibir('Centro acadêmico salvo com sucesso.');
        this.router.navigate(['/centros-academicos'], { queryParams: { id: centro.id } });
      },
      error: () => {
        this.salvando.set(false);
        this.notificacao.exibir('Não foi possível salvar o centro acadêmico. Verifique os dados.');
      }
    });
  }

  private carregar(id: number) {
    this.erroCarga.set(null);
    this.service.buscarPorId(id).subscribe({
      next: centro => this.formulario.patchValue({ ...centro, iesId: centro.ies.id }),
      error: () => this.erroCarga.set('Não foi possível carregar o centro acadêmico.')
    });
  }
}

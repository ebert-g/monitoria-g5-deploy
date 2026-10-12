import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { lerId } from '../../../shared/id-da-rota';
import { NotificacaoService } from '../../../shared/notificacao.service';
import { IesService } from '../../services/ies.service';

@Component({
  selector: 'app-ies-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './ies-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IesForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(IesService);
  private readonly notificacao = inject(NotificacaoService);

  readonly id = input<string>();

  protected readonly idRegistro = computed(() => lerId(this.id()));
  protected readonly modoEdicao = computed(() => this.id() !== undefined);
  protected readonly salvando = signal(false);
  protected readonly erroCarga = signal<string | null>(null);

  protected readonly formulario = this.fb.group({
    sigla: ['', Validators.required],
    nome: ['', Validators.required],
    emailCentral: ['', [Validators.required, Validators.email]],
    telefoneCentral: ['', Validators.required]
  });

  constructor() {
    effect(() => {
      if (!this.modoEdicao()) return;

      this.formulario.controls.sigla.disable();
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
    const payload = this.formulario.getRawValue();
    const id = this.idRegistro();
    const requisicao = id === null ? this.service.cadastrar(payload) : this.service.editar(id, payload);

    requisicao.subscribe({
      next: ies => {
        this.notificacao.exibir('Instituição salva com sucesso.');
        this.router.navigate(['/ies'], { queryParams: { id: ies.id } });
      },
      error: () => {
        this.salvando.set(false);
        this.notificacao.exibir('Não foi possível salvar a instituição. Verifique os dados.');
      }
    });
  }

  private carregar(id: number) {
    this.erroCarga.set(null);
    this.service.buscarPorId(id).subscribe({
      next: ies => this.formulario.patchValue(ies),
      error: () => this.erroCarga.set('Não foi possível carregar a instituição.')
    });
  }
}

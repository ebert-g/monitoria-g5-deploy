import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { lerId } from '../../../shared/id-da-rota';
import { NotificacaoService } from '../../../shared/notificacao.service';
import { DiscenteService } from '../../services/discente.service';
import { DocenteService } from '../../services/docente.service';
import { Perfil, ROTULO_PERFIL } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

export type TipoPessoa = 'docente' | 'discente';

interface ConfigAcesso {
  voltar: string;
  perfis: Perfil[];
}

interface DadosPessoa {
  nomeCompleto: string;
  email: string;
}

const CONFIG: Record<TipoPessoa, ConfigAcesso> = {
  docente: { voltar: '/docentes', perfis: ['COLABORADOR', 'ADMINISTRADOR'] },
  discente: { voltar: '/discentes', perfis: ['USUARIO'] }
};

@Component({
  selector: 'app-acesso-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './acesso-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcessoForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly usuarios = inject(UsuarioService);
  private readonly docentes = inject(DocenteService);
  private readonly discentes = inject(DiscenteService);
  private readonly notificacao = inject(NotificacaoService);

  readonly tipo = input.required<TipoPessoa>();
  readonly id = input<string>();

  protected readonly rotuloPerfil = ROTULO_PERFIL;
  protected readonly config = computed(() => CONFIG[this.tipo()]);
  protected readonly idRegistro = computed(() => lerId(this.id()));
  protected readonly nomePessoa = signal<string | null>(null);
  protected readonly salvando = signal(false);
  protected readonly senhaVisivel = signal(false);
  protected readonly erroCarga = signal<string | null>(null);

  protected readonly formulario = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    perfil: this.fb.control<Perfil>('COLABORADOR', Validators.required)
  });

  constructor() {
    effect(() => {
      const { perfis } = this.config();
      const perfil = this.formulario.controls.perfil;
      perfil.setValue(perfis[0]);
      if (perfis.length === 1) perfil.disable();

      const id = this.idRegistro();
      if (id === null) {
        this.erroCarga.set('ID inválido.');
        return;
      }
      this.carregar(id);
    });
  }

  protected alternarSenha() {
    this.senhaVisivel.update(visivel => !visivel);
  }

  protected salvar() {
    const id = this.idRegistro();
    if (this.formulario.invalid || id === null) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.salvando.set(true);
    const tipo = this.tipo();
    const { email, senha, perfil } = this.formulario.getRawValue();

    this.usuarios
      .cadastrar({
        email,
        senha,
        perfil,
        docenteId: tipo === 'docente' ? id : null,
        discenteId: tipo === 'discente' ? id : null
      })
      .subscribe({
        next: () => {
          this.notificacao.exibir('Acesso criado. Informe a senha inicial ao usuário.');
          this.router.navigate([this.config().voltar], { queryParams: { id } });
        },
        error: () => {
          this.salvando.set(false);
          this.notificacao.exibir('Não foi possível criar o acesso. O e-mail pode já estar em uso.');
        }
      });
  }

  private carregar(id: number) {
    this.erroCarga.set(null);
    const requisicao: Observable<DadosPessoa> =
      this.tipo() === 'docente' ? this.docentes.buscarPorId(id) : this.discentes.buscarPorId(id);

    requisicao.subscribe({
      next: pessoa => {
        this.nomePessoa.set(pessoa.nomeCompleto);
        this.formulario.controls.email.setValue(pessoa.email);
      },
      error: () => this.erroCarga.set('Não foi possível carregar os dados da pessoa.')
    });
  }
}

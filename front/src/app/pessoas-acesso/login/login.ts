import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  protected readonly carregando = signal(false);
  protected readonly senhaVisivel = signal(false);
  protected readonly erro = signal<string | null>(null);

  protected readonly formulario = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });

  protected alternarSenha() {
    this.senhaVisivel.update(visivel => !visivel);
  }

  protected entrar() {
    if (this.carregando()) return;

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando.set(true);
    this.erro.set(null);

    this.auth.entrar(this.formulario.getRawValue()).subscribe({
      next: () => this.router.navigate(['/']),
      error: (erro: HttpErrorResponse) => {
        this.carregando.set(false);
        this.erro.set(this.mensagemDeErro(erro));
      }
    });
  }

  private mensagemDeErro(erro: HttpErrorResponse): string {
    if (erro.status === 401 && typeof erro.error === 'string') return erro.error;
    if (erro.status === 0) return 'Não foi possível conectar ao servidor.';
    return 'Não foi possível entrar. Tente novamente.';
  }
}

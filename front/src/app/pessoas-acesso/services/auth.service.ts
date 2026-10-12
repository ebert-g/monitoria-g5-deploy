import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';

export type Perfil = 'ADMINISTRADOR' | 'COLABORADOR' | 'USUARIO';

export const ROTULO_PERFIL: Record<Perfil, string> = {
  ADMINISTRADOR: 'Administrador',
  COLABORADOR: 'Colaborador',
  USUARIO: 'Usuário'
};

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  perfil: Perfil;
}

interface PayloadToken {
  sub: string;
  exp: number;
  perfil: Perfil;
}

const CHAVE_TOKEN = 'monitoria_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly token = signal<string | null>(this.lerTokenArmazenado());
  private readonly payload = computed(() => {
    const token = this.token();
    return token ? this.decodificar(token) : null;
  });

  readonly perfil = computed(() => this.payload()?.perfil ?? null);
  readonly email = computed(() => this.payload()?.sub ?? null);

  entrar(request: LoginRequest) {
    return this.http.post<LoginResponse>('/api/auth/login', request).pipe(
      tap(({ token }) => {
        localStorage.setItem(CHAVE_TOKEN, token);
        this.token.set(token);
      })
    );
  }

  sair() {
    localStorage.removeItem(CHAVE_TOKEN);
    this.token.set(null);
  }

  obterToken(): string | null {
    return this.token();
  }

  estaAutenticado(): boolean {
    const token = this.token();
    if (token === null) return false;
    if (this.expirado(token)) {
      this.sair();
      return false;
    }
    return true;
  }

  possuiPerfil(perfis: Perfil[]): boolean {
    const perfil = this.perfil();
    return perfil !== null && perfis.includes(perfil);
  }

  private lerTokenArmazenado(): string | null {
    const token = localStorage.getItem(CHAVE_TOKEN);
    if (token !== null && this.expirado(token)) {
      localStorage.removeItem(CHAVE_TOKEN);
      return null;
    }
    return token;
  }

  private expirado(token: string): boolean {
    const payload = this.decodificar(token);
    return payload === null || payload.exp * 1000 <= Date.now();
  }

  private decodificar(token: string): PayloadToken | null {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64)) as PayloadToken;
    } catch {
      return null;
    }
  }
}

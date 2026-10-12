import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CadastroUsuarioRequest, UsuarioCriado } from '../models/pessoa.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly http = inject(HttpClient);

  cadastrar(request: CadastroUsuarioRequest) {
    return this.http.post<UsuarioCriado>('/api/usuarios', request);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Discente, DiscentePayload } from '../models/pessoa.model';

@Injectable({ providedIn: 'root' })
export class DiscenteService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/discentes';

  buscarPorId(id: number) {
    return this.http.get<Discente>(`${this.url}/${id}`);
  }

  cadastrar(cursoId: number, payload: DiscentePayload) {
    return this.http.post<Discente>(`${this.url}/curso/${cursoId}`, payload);
  }

  editar(id: number, payload: DiscentePayload) {
    return this.http.put<Discente>(`${this.url}/${id}`, payload);
  }

  inativar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

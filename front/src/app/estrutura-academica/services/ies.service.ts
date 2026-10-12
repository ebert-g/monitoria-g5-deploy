import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Ies, IesPayload } from '../models/estrutura-academica.model';

@Injectable({ providedIn: 'root' })
export class IesService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/ies';

  buscarPorId(id: number) {
    return this.http.get<Ies>(`${this.url}/${id}`);
  }

  cadastrar(payload: IesPayload) {
    return this.http.post<Ies>(this.url, payload);
  }

  editar(id: number, payload: IesPayload) {
    return this.http.put<Ies>(`${this.url}/${id}`, payload);
  }

  inativar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

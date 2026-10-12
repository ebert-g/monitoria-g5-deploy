import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Docente, DocentePayload } from '../models/pessoa.model';

@Injectable({ providedIn: 'root' })
export class DocenteService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/docentes';

  buscarPorId(id: number) {
    return this.http.get<Docente>(`${this.url}/${id}`);
  }

  cadastrar(centroAcademicoId: number, payload: DocentePayload) {
    return this.http.post<Docente>(`${this.url}/centro-academico/${centroAcademicoId}`, payload);
  }

  editar(id: number, payload: DocentePayload) {
    return this.http.put<Docente>(`${this.url}/${id}`, payload);
  }

  inativar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

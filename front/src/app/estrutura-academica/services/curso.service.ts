import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Curso, CursoPayload } from '../models/estrutura-academica.model';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/cursos';

  buscarPorId(id: number) {
    return this.http.get<Curso>(`${this.url}/${id}`);
  }

  cadastrar(centroAcademicoId: number, payload: CursoPayload) {
    return this.http.post<Curso>(`${this.url}/centro-academico/${centroAcademicoId}`, payload);
  }

  editar(id: number, payload: CursoPayload) {
    return this.http.put<Curso>(`${this.url}/${id}`, payload);
  }

  inativar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

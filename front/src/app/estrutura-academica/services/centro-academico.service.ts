import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CentroAcademico, CentroAcademicoPayload } from '../models/estrutura-academica.model';

@Injectable({ providedIn: 'root' })
export class CentroAcademicoService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/centros-academicos';

  buscarPorId(id: number) {
    return this.http.get<CentroAcademico>(`${this.url}/${id}`);
  }

  cadastrar(iesId: number, payload: CentroAcademicoPayload) {
    return this.http.post<CentroAcademico>(`${this.url}/ies/${iesId}`, payload);
  }

  editar(id: number, payload: CentroAcademicoPayload) {
    return this.http.put<CentroAcademico>(`${this.url}/${id}`, payload);
  }

  inativar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

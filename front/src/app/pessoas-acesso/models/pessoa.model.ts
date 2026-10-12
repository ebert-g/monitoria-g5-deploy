import { Perfil } from '../services/auth.service';

export interface Docente {
  id: number;
  matricula: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  centroAcademicoId: number;
  dataCadastramento: string;
  ativo: boolean;
}

export type DocentePayload = Pick<Docente, 'matricula' | 'nomeCompleto' | 'email' | 'telefone'>;

export interface Discente {
  id: number;
  matricula: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  cursoId: number;
  dataCadastramento: string;
  ativo: boolean;
}

export type DiscentePayload = Pick<Discente, 'matricula' | 'nomeCompleto' | 'email' | 'telefone'>;

export interface CadastroUsuarioRequest {
  email: string;
  senha: string;
  perfil: Perfil;
  docenteId: number | null;
  discenteId: number | null;
}

export interface UsuarioCriado {
  id: number;
  email: string;
  perfil: Perfil;
}

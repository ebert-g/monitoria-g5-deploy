export interface Ies {
  id: number;
  sigla: string;
  nome: string;
  emailCentral: string;
  telefoneCentral: string;
  ativo: boolean;
}

export type IesPayload = Pick<Ies, 'sigla' | 'nome' | 'emailCentral' | 'telefoneCentral'>;

export interface CentroAcademico {
  id: number;
  nome: string;
  emailCentral: string;
  telefoneCentral: string;
  coordenador: string;
  ies: Ies;
  dataCadastramento: string;
  ativo: boolean;
}

export type CentroAcademicoPayload = Pick<
  CentroAcademico,
  'nome' | 'emailCentral' | 'telefoneCentral' | 'coordenador'
>;

export interface Curso {
  id: number;
  sigla: string;
  descricao: string;
  coordenador: string;
  turnos: string[];
  centroAcademico: CentroAcademico;
  dataCadastramento: string;
  ativo: boolean;
}

export type CursoPayload = Pick<Curso, 'sigla' | 'descricao' | 'coordenador' | 'turnos'>;

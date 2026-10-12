import { Perfil } from '../pessoas-acesso/services/auth.service';

export interface ItemMenu {
  rotulo: string;
  descricao: string;
  icone: string;
  rota: string;
}

const INICIO: ItemMenu = {
  rotulo: 'Dashboard',
  descricao: 'Visão geral do sistema',
  icone: 'dashboard',
  rota: '/'
};

const ESTRUTURA_ACADEMICA: ItemMenu[] = [
  {
    rotulo: 'Instituições',
    descricao: 'Consulte, cadastre e edite instituições de ensino superior',
    icone: 'account_balance',
    rota: '/ies'
  },
  {
    rotulo: 'Centros Acadêmicos',
    descricao: 'Consulte, cadastre e edite centros acadêmicos',
    icone: 'domain',
    rota: '/centros-academicos'
  },
  {
    rotulo: 'Cursos',
    descricao: 'Consulte, cadastre e edite cursos',
    icone: 'menu_book',
    rota: '/cursos'
  }
];

const PESSOAS: ItemMenu[] = [
  {
    rotulo: 'Docentes',
    descricao: 'Cadastre docentes e crie o acesso ao sistema',
    icone: 'badge',
    rota: '/docentes'
  },
  {
    rotulo: 'Discentes',
    descricao: 'Cadastre discentes e crie o acesso ao sistema',
    icone: 'groups',
    rota: '/discentes'
  }
];

const MENU_POR_PERFIL: Record<Perfil, ItemMenu[]> = {
  ADMINISTRADOR: [INICIO, ...ESTRUTURA_ACADEMICA, ...PESSOAS],
  COLABORADOR: [INICIO],
  USUARIO: [INICIO]
};

export function itensDoPerfil(perfil: Perfil | null): ItemMenu[] {
  return perfil ? MENU_POR_PERFIL[perfil] : [];
}

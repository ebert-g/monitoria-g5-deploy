package br.com.ucsal.sistemamonitoria.pessoasAcesso;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Docente;

public interface DocenteService {
    Docente cadastrar(Long centroAcademicoId, Docente docente);
    Docente editar(Long id, Docente docenteAtualizado);
    void inativar(Long id);
    Docente buscarPorId(Long id);
}
package br.com.ucsal.sistemamonitoria.estruturaAcademica;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.Curso;

public interface CursoService {
    Curso cadastrar(Long centroAcademicoId, Curso curso);
    Curso editar(Long id, Curso cursoAtualizado);
    void inativar(Long id);
    Curso buscarPorId(Long id);
}
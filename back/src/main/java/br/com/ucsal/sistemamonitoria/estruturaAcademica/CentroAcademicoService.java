package br.com.ucsal.sistemamonitoria.estruturaAcademica;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.CentroAcademico;

public interface CentroAcademicoService {
    CentroAcademico cadastrar(Long iesId, CentroAcademico centroAcademico);
    CentroAcademico editar(Long id, CentroAcademico centroAcademicoAtualizado);
    void inativar(Long id);
    CentroAcademico buscarPorId(Long id);
}
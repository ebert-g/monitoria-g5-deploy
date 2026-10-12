package br.com.ucsal.sistemamonitoria.estruturaAcademica;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.Ies;

public interface IesService {
    Ies cadastrar(Ies ies);
    Ies editar(Long id, Ies iesAtualizada);
    void inativar(Long id);
    Ies buscarPorId(Long id);
}
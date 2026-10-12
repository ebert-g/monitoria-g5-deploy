package br.com.ucsal.sistemamonitoria.pessoasAcesso;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Discente;

public interface DiscenteService {
    Discente cadastrar(Long cursoId, Discente discente);
    Discente editar(Long id, Discente discenteAtualizado);
    void inativar(Long id);
    Discente buscarPorId(Long id);
}
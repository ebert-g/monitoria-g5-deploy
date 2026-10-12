package br.com.ucsal.sistemamonitoria.pessoasAcesso.repository;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Discente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscenteRepository extends JpaRepository<Discente, Long> {
}
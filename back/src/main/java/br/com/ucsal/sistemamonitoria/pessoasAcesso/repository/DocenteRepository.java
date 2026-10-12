package br.com.ucsal.sistemamonitoria.pessoasAcesso.repository;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Docente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocenteRepository extends JpaRepository<Docente, Long> {
}
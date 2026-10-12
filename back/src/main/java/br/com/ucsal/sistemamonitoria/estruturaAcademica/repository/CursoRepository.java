package br.com.ucsal.sistemamonitoria.estruturaAcademica.repository;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}
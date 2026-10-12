package br.com.ucsal.sistemamonitoria.estruturaAcademica.repository;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.CentroAcademico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CentroAcademicoRepository extends JpaRepository<CentroAcademico, Long> {
}
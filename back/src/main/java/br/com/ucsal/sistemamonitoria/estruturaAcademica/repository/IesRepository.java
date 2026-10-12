package br.com.ucsal.sistemamonitoria.estruturaAcademica.repository;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.Ies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IesRepository extends JpaRepository<Ies, Long> {
}
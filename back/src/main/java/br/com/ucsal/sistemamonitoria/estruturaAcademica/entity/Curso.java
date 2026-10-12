package br.com.ucsal.sistemamonitoria.estruturaAcademica.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sigla;
    private String descricao;
    private String coordenador;

    @ElementCollection
    @CollectionTable(name = "curso_turnos", joinColumns = @JoinColumn(name = "curso_id"))
    @Column(name = "turno")
    private List<String> turnos = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "centro_academico_id", nullable = false)
    private CentroAcademico centroAcademico;

    private LocalDate dataCadastramento = LocalDate.now();
    private boolean ativo = true;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSigla() { return sigla; }
    public void setSigla(String sigla) { this.sigla = sigla; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getCoordenador() { return coordenador; }
    public void setCoordenador(String coordenador) { this.coordenador = coordenador; }

    public List<String> getTurnos() { return turnos; }
    public void setTurnos(List<String> turnos) { this.turnos = turnos; }

    public CentroAcademico getCentroAcademico() { return centroAcademico; }
    public void setCentroAcademico(CentroAcademico centroAcademico) { this.centroAcademico = centroAcademico; }

    public LocalDate getDataCadastramento() { return dataCadastramento; }
    public void setDataCadastramento(LocalDate dataCadastramento) { this.dataCadastramento = dataCadastramento; }

    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
}
package br.com.ucsal.sistemamonitoria.estruturaAcademica.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "centro_academico")
public class CentroAcademico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String emailCentral;
    private String telefoneCentral;
    private String coordenador;

    @ManyToOne
    @JoinColumn(name = "ies_id", nullable = false)
    private Ies ies;

    private LocalDate dataCadastramento = LocalDate.now();
    private boolean ativo = true;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmailCentral() { return emailCentral; }
    public void setEmailCentral(String emailCentral) { this.emailCentral = emailCentral; }

    public String getTelefoneCentral() { return telefoneCentral; }
    public void setTelefoneCentral(String telefoneCentral) { this.telefoneCentral = telefoneCentral; }

    public String getCoordenador() { return coordenador; }
    public void setCoordenador(String coordenador) { this.coordenador = coordenador; }

    public Ies getIes() { return ies; }
    public void setIes(Ies ies) { this.ies = ies; }

    public LocalDate getDataCadastramento() { return dataCadastramento; }
    public void setDataCadastramento(LocalDate dataCadastramento) { this.dataCadastramento = dataCadastramento; }

    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
}
package br.com.ucsal.sistemamonitoria.estruturaAcademica.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ies")
public class Ies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sigla;
    private String nome;
    private String emailCentral;
    private String telefoneCentral;
    private boolean ativo = true;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmailCentral() {
        return emailCentral;
    }

    public void setEmailCentral(String emailCentral) {
        this.emailCentral = emailCentral;
    }

    public String getTelefoneCentral() {
        return telefoneCentral;
    }

    public void setTelefoneCentral(String telefoneCentral) {
        this.telefoneCentral = telefoneCentral;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}
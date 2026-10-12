package br.com.ucsal.sistemamonitoria.pessoasAcesso.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "discente")
public class Discente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String matricula;
    private String nomeCompleto;
    private String email;
    private String telefone;

    private Long cursoId;

    private LocalDate dataCadastramento = LocalDate.now();
    private boolean ativo = true;

    // getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public Long getCursoId() { return cursoId; }
    public void setCursoId(Long cursoId) { this.cursoId = cursoId; }

    public LocalDate getDataCadastramento() { return dataCadastramento; }
    public void setDataCadastramento(LocalDate dataCadastramento) { this.dataCadastramento = dataCadastramento; }

    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
}
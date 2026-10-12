package br.com.ucsal.sistemamonitoria.pessoasAcesso.controller;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Docente;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.DocenteService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/docentes")
public class DocenteController {

    private final DocenteService docenteService;

    public DocenteController(DocenteService docenteService) {
        this.docenteService = docenteService;
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/centro-academico/{centroAcademicoId}")
    public Docente cadastrar(@PathVariable Long centroAcademicoId, @RequestBody Docente docente) {
        return docenteService.cadastrar(centroAcademicoId, docente);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/{id}")
    public Docente editar(@PathVariable Long id, @RequestBody Docente docente) {
        return docenteService.editar(id, docente);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @DeleteMapping("/{id}")
    public void inativar(@PathVariable Long id) {
        docenteService.inativar(id);
    }

    @GetMapping("/{id}")
    public Docente buscarPorId(@PathVariable Long id) {
        return docenteService.buscarPorId(id);
    }
}
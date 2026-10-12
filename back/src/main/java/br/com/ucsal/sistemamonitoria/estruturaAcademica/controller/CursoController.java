package br.com.ucsal.sistemamonitoria.estruturaAcademica.controller;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.Curso;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.CursoService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/centro-academico/{centroAcademicoId}")
    public Curso cadastrar(@PathVariable Long centroAcademicoId, @RequestBody Curso curso) {
        return cursoService.cadastrar(centroAcademicoId, curso);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/{id}")
    public Curso editar(@PathVariable Long id, @RequestBody Curso curso) {
        return cursoService.editar(id, curso);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @DeleteMapping("/{id}")
    public void inativar(@PathVariable Long id) {
        cursoService.inativar(id);
    }

    @GetMapping("/{id}")
    public Curso buscarPorId(@PathVariable Long id) {
        return cursoService.buscarPorId(id);
    }
}
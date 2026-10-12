package br.com.ucsal.sistemamonitoria.estruturaAcademica.controller;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.CentroAcademico;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.CentroAcademicoService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/centros-academicos")
public class CentroAcademicoController {

    private final CentroAcademicoService centroAcademicoService;

    public CentroAcademicoController(CentroAcademicoService centroAcademicoService) {
        this.centroAcademicoService = centroAcademicoService;
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/ies/{iesId}")
    public CentroAcademico cadastrar(@PathVariable Long iesId, @RequestBody CentroAcademico centroAcademico) {
        return centroAcademicoService.cadastrar(iesId, centroAcademico);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/{id}")
    public CentroAcademico editar(@PathVariable Long id, @RequestBody CentroAcademico centroAcademico) {
        return centroAcademicoService.editar(id, centroAcademico);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @DeleteMapping("/{id}")
    public void inativar(@PathVariable Long id) {
        centroAcademicoService.inativar(id);
    }

    @GetMapping("/{id}")
    public CentroAcademico buscarPorId(@PathVariable Long id) {
        return centroAcademicoService.buscarPorId(id);
    }
}
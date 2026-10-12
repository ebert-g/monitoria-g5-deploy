package br.com.ucsal.sistemamonitoria.estruturaAcademica.controller;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.Ies;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.IesService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ies")
public class IesController {

    private final IesService iesService;

    public IesController(IesService iesService) {
        this.iesService = iesService;
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping
    public Ies cadastrar(@RequestBody Ies ies) {
        return iesService.cadastrar(ies);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/{id}")
    public Ies editar(@PathVariable Long id, @RequestBody Ies ies) {
        return iesService.editar(id, ies);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @DeleteMapping("/{id}")
    public void inativar(@PathVariable Long id) {
        iesService.inativar(id);
    }

    @GetMapping("/{id}")
    public Ies buscarPorId(@PathVariable Long id) {
        return iesService.buscarPorId(id);
    }
}
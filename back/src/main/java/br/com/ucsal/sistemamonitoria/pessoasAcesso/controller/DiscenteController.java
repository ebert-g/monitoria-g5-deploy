package br.com.ucsal.sistemamonitoria.pessoasAcesso.controller;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Discente;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.DiscenteService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/discentes")
public class DiscenteController {

    private final DiscenteService discenteService;

    public DiscenteController(DiscenteService discenteService) {
        this.discenteService = discenteService;
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/curso/{cursoId}")
    public Discente cadastrar(@PathVariable Long cursoId, @RequestBody Discente discente) {
        return discenteService.cadastrar(cursoId, discente);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/{id}")
    public Discente editar(@PathVariable Long id, @RequestBody Discente discente) {
        return discenteService.editar(id, discente);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @DeleteMapping("/{id}")
    public void inativar(@PathVariable Long id) {
        discenteService.inativar(id);
    }

    @GetMapping("/{id}")
    public Discente buscarPorId(@PathVariable Long id) {
        return discenteService.buscarPorId(id);
    }
}
package br.com.ucsal.sistemamonitoria.pessoasAcesso.controller;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.Perfil;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.UsuarioService;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Usuario;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    public record CadastroRequest(String email, String senha, Perfil perfil, Long docenteId, Long discenteId) {}

    @PostMapping
    public Usuario cadastrar(@RequestBody CadastroRequest request) {
        return usuarioService.cadastrar(
                request.email(),
                request.senha(),
                request.perfil(),
                request.docenteId(),
                request.discenteId()
        );
    }
}
package br.com.ucsal.sistemamonitoria.pessoasAcesso.controller;

import br.com.ucsal.sistemamonitoria.config.CredenciaisInvalidasException;
import br.com.ucsal.sistemamonitoria.config.JwtUtil;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.UsuarioService;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Usuario;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioService usuarioService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public record LoginRequest(String email, String senha) {}
    public record LoginResponse(String token, String perfil) {}

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Usuario usuario = usuarioService.buscarPorEmail(request.email());

        if (!usuario.isAtivo()) {
            throw new CredenciaisInvalidasException("Usuário inativo");
        }

        if (!passwordEncoder.matches(request.senha(), usuario.getSenhaHash())) {
            throw new CredenciaisInvalidasException("Senha inválida");
        }

        String token = jwtUtil.gerarToken(usuario.getEmail(), usuario.getPerfil().name());

        return new LoginResponse(token, usuario.getPerfil().name());
    }
}
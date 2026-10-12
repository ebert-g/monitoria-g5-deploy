package br.com.ucsal.sistemamonitoria.pessoasAcesso.service;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.Perfil;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.UsuarioService;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Usuario;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Usuario cadastrar(String email, String senha, Perfil perfil, Long docenteId, Long discenteId) {
        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Já existe um usuário cadastrado com esse email");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setSenhaHash(passwordEncoder.encode(senha));
        usuario.setPerfil(perfil);
        usuario.setDocenteId(docenteId);
        usuario.setDiscenteId(discenteId);

        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}
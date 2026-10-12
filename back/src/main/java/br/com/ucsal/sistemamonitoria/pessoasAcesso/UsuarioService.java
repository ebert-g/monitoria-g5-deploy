package br.com.ucsal.sistemamonitoria.pessoasAcesso;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Usuario;

public interface UsuarioService {
    Usuario cadastrar(String email, String senha, Perfil perfil, Long docenteId, Long discenteId);
    Usuario buscarPorEmail(String email);
}
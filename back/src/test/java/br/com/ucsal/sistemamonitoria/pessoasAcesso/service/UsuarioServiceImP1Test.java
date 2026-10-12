package br.com.ucsal.sistemamonitoria.pessoasAcesso.service;

import br.com.ucsal.sistemamonitoria.pessoasAcesso.Perfil;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Usuario;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceImplTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private UsuarioServiceImpl usuarioService;

    @BeforeEach
    void setUp() {
        usuarioService = new UsuarioServiceImpl(usuarioRepository, passwordEncoder);
    }

    @Test
    void deveCadastrarUsuarioComSenhaCriptografada() {
        when(usuarioRepository.findByEmail("teste@ucsal.br")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("123456")).thenReturn("hash-fake");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(i -> i.getArgument(0));

        Usuario usuario = usuarioService.cadastrar("teste@ucsal.br", "123456", Perfil.ADMINISTRADOR, null, null);

        assertThat(usuario.getEmail()).isEqualTo("teste@ucsal.br");
        assertThat(usuario.getSenhaHash()).isEqualTo("hash-fake");
        assertThat(usuario.getPerfil()).isEqualTo(Perfil.ADMINISTRADOR);
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void naoDeveCadastrarUsuarioComEmailJaExistente() {
        when(usuarioRepository.findByEmail("teste@ucsal.br"))
                .thenReturn(Optional.of(new Usuario()));

        assertThatThrownBy(() ->
                usuarioService.cadastrar("teste@ucsal.br", "123456", Perfil.ADMINISTRADOR, null, null))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Já existe");

        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void deveBuscarUsuarioPorEmail() {
        Usuario usuarioExistente = new Usuario();
        usuarioExistente.setEmail("teste@ucsal.br");
        when(usuarioRepository.findByEmail("teste@ucsal.br")).thenReturn(Optional.of(usuarioExistente));

        Usuario encontrado = usuarioService.buscarPorEmail("teste@ucsal.br");

        assertThat(encontrado.getEmail()).isEqualTo("teste@ucsal.br");
    }

    @Test
    void deveLancarErroQuandoUsuarioNaoEncontrado() {
        when(usuarioRepository.findByEmail("inexistente@ucsal.br")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> usuarioService.buscarPorEmail("inexistente@ucsal.br"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("não encontrado");
    }
}
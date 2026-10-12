package br.com.ucsal.sistemamonitoria.pessoasAcesso.controller;

import br.com.ucsal.sistemamonitoria.config.GlobalExceptionHandler;
import br.com.ucsal.sistemamonitoria.config.JwtUtil;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.Perfil;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.UsuarioService;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        AuthController authController = new AuthController(usuarioService, passwordEncoder, jwtUtil);
        mockMvc = MockMvcBuilders.standaloneSetup(authController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void deveLogarComSucessoERetornarToken() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setEmail("teste@ucsal.br");
        usuario.setSenhaHash("hash-fake");
        usuario.setPerfil(Perfil.ADMINISTRADOR);
        usuario.setAtivo(true);

        when(usuarioService.buscarPorEmail("teste@ucsal.br")).thenReturn(usuario);
        when(passwordEncoder.matches("123456", "hash-fake")).thenReturn(true);
        when(jwtUtil.gerarToken("teste@ucsal.br", "ADMINISTRADOR")).thenReturn("token-fake");

        mockMvc.perform(post("/api/auth/login")
                        .contentType("application/json")
                        .content("""
                                {
                                  "email": "teste@ucsal.br",
                                  "senha": "123456"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token-fake"))
                .andExpect(jsonPath("$.perfil").value("ADMINISTRADOR"));
    }

    @Test
    void deveRejeitarSenhaInvalida() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setEmail("teste@ucsal.br");
        usuario.setSenhaHash("hash-fake");
        usuario.setPerfil(Perfil.ADMINISTRADOR);
        usuario.setAtivo(true);

        when(usuarioService.buscarPorEmail("teste@ucsal.br")).thenReturn(usuario);
        when(passwordEncoder.matches("senha-errada", "hash-fake")).thenReturn(false);

        mockMvc.perform(post("/api/auth/login")
                        .contentType("application/json")
                        .content("""
                                {
                                  "email": "teste@ucsal.br",
                                  "senha": "senha-errada"
                                }
                                """))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void deveRejeitarUsuarioInativo() throws Exception {
        Usuario usuario = new Usuario();
        usuario.setEmail("teste@ucsal.br");
        usuario.setSenhaHash("hash-fake");
        usuario.setPerfil(Perfil.ADMINISTRADOR);
        usuario.setAtivo(false);

        when(usuarioService.buscarPorEmail("teste@ucsal.br")).thenReturn(usuario);

        mockMvc.perform(post("/api/auth/login")
                        .contentType("application/json")
                        .content("""
                                {
                                  "email": "teste@ucsal.br",
                                  "senha": "123456"
                                }
                                """))
                .andExpect(status().isUnauthorized());
    }
}
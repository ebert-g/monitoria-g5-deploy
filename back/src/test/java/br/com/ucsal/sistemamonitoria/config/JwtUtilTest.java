package br.com.ucsal.sistemamonitoria.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        // injeta os valores que normalmente viriam do application.properties via @Value
        ReflectionTestUtils.setField(jwtUtil, "secret", "chave-de-teste-com-pelo-menos-32-caracteres-123");
        ReflectionTestUtils.setField(jwtUtil, "expirationMs", 3600000L);
    }

    @Test
    void deveGerarTokenValido() {
        String token = jwtUtil.gerarToken("teste@ucsal.br", "ADMINISTRADOR");

        assertThat(token).isNotBlank();
        assertThat(jwtUtil.tokenValido(token)).isTrue();
    }

    @Test
    void deveExtrairEmailDoToken() {
        String token = jwtUtil.gerarToken("teste@ucsal.br", "ADMINISTRADOR");

        assertThat(jwtUtil.extrairEmail(token)).isEqualTo("teste@ucsal.br");
    }

    @Test
    void deveExtrairPerfilDoToken() {
        String token = jwtUtil.gerarToken("teste@ucsal.br", "COLABORADOR");

        assertThat(jwtUtil.extrairPerfil(token)).isEqualTo("COLABORADOR");
    }

    @Test
    void deveInvalidarTokenMalformado() {
        assertThat(jwtUtil.tokenValido("isso-nao-e-um-token-valido")).isFalse();
    }

    @Test
    void deveInvalidarTokenAssinadoComOutraChave() {
        JwtUtil outroJwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(outroJwtUtil, "secret", "outra-chave-completamente-diferente-123456789");
        ReflectionTestUtils.setField(outroJwtUtil, "expirationMs", 3600000L);

        String tokenComOutraChave = outroJwtUtil.gerarToken("hacker@teste.com", "ADMINISTRADOR");

        assertThat(jwtUtil.tokenValido(tokenComOutraChave)).isFalse();
    }
}
package br.com.ucsal.sistemamonitoria;

import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModules;

class ArchitectureTests {

    ApplicationModules modules = ApplicationModules.of(SistemaDeMonitoriaApplication.class);

    @Test
    void verificaFronteirasDosModulos() {
        modules.verify();
    }

    @Test
    void imprimeEstruturaDosModulos() {
        System.out.println(modules);
    }
}
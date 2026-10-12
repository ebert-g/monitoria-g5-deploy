package br.com.ucsal.sistemamonitoria.pessoasAcesso.service;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.CentroAcademicoService;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.DocenteService;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Docente;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.repository.DocenteRepository;
import org.springframework.stereotype.Service;

@Service
public class DocenteServiceImpl implements DocenteService {

    private final DocenteRepository docenteRepository;
    private final CentroAcademicoService centroAcademicoService;

    public DocenteServiceImpl(DocenteRepository docenteRepository,
                              CentroAcademicoService centroAcademicoService) {
        this.docenteRepository = docenteRepository;
        this.centroAcademicoService = centroAcademicoService;
    }

    @Override
    public Docente cadastrar(Long centroAcademicoId, Docente docente) {
        centroAcademicoService.buscarPorId(centroAcademicoId); // valida que existe
        docente.setCentroAcademicoId(centroAcademicoId);
        return docenteRepository.save(docente);
    }

    @Override
    public Docente editar(Long id, Docente docenteAtualizado) {
        Docente existente = buscarPorId(id);
        existente.setNomeCompleto(docenteAtualizado.getNomeCompleto());
        existente.setEmail(docenteAtualizado.getEmail());
        existente.setTelefone(docenteAtualizado.getTelefone());
        return docenteRepository.save(existente);
    }

    @Override
    public void inativar(Long id) {
        Docente docente = buscarPorId(id);
        docente.setAtivo(false);
        docenteRepository.save(docente);
    }

    @Override
    public Docente buscarPorId(Long id) {
        return docenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Docente não encontrado"));
    }
}
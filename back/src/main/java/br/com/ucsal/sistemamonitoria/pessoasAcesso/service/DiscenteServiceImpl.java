package br.com.ucsal.sistemamonitoria.pessoasAcesso.service;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.CursoService;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.DiscenteService;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.entity.Discente;
import br.com.ucsal.sistemamonitoria.pessoasAcesso.repository.DiscenteRepository;
import org.springframework.stereotype.Service;

@Service
public class DiscenteServiceImpl implements DiscenteService {

    private final DiscenteRepository discenteRepository;
    private final CursoService cursoService;

    public DiscenteServiceImpl(DiscenteRepository discenteRepository,
                               CursoService cursoService) {
        this.discenteRepository = discenteRepository;
        this.cursoService = cursoService;
    }

    @Override
    public Discente cadastrar(Long cursoId, Discente discente) {
        cursoService.buscarPorId(cursoId); // valida que o curso existe
        discente.setCursoId(cursoId);
        return discenteRepository.save(discente);
    }

    @Override
    public Discente editar(Long id, Discente discenteAtualizado) {
        Discente existente = buscarPorId(id);
        existente.setNomeCompleto(discenteAtualizado.getNomeCompleto());
        existente.setEmail(discenteAtualizado.getEmail());
        existente.setTelefone(discenteAtualizado.getTelefone());
        return discenteRepository.save(existente);
    }

    @Override
    public void inativar(Long id) {
        Discente discente = buscarPorId(id);
        discente.setAtivo(false);
        discenteRepository.save(discente);
    }

    @Override
    public Discente buscarPorId(Long id) {
        return discenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discente não encontrado"));
    }
}
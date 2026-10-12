package br.com.ucsal.sistemamonitoria.estruturaAcademica.service;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.CursoService;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.CentroAcademico;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.Curso;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.repository.CentroAcademicoRepository;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.repository.CursoRepository;
import org.springframework.stereotype.Service;

@Service
public class CursoServiceImpl implements CursoService {

    private final CursoRepository cursoRepository;
    private final CentroAcademicoRepository centroAcademicoRepository;

    public CursoServiceImpl(CursoRepository cursoRepository,
                            CentroAcademicoRepository centroAcademicoRepository) {
        this.cursoRepository = cursoRepository;
        this.centroAcademicoRepository = centroAcademicoRepository;
    }

    @Override
    public Curso cadastrar(Long centroAcademicoId, Curso curso) {
        CentroAcademico centroAcademico = centroAcademicoRepository.findById(centroAcademicoId)
                .orElseThrow(() -> new RuntimeException("Centro Acadêmico não encontrado"));
        curso.setCentroAcademico(centroAcademico);
        return cursoRepository.save(curso);
    }

    @Override
    public Curso editar(Long id, Curso cursoAtualizado) {
        Curso existente = buscarPorId(id);
        existente.setSigla(cursoAtualizado.getSigla());
        existente.setDescricao(cursoAtualizado.getDescricao());
        existente.setCoordenador(cursoAtualizado.getCoordenador());
        existente.setTurnos(cursoAtualizado.getTurnos());
        return cursoRepository.save(existente);
    }

    @Override
    public void inativar(Long id) {
        Curso curso = buscarPorId(id);
        curso.setAtivo(false);
        cursoRepository.save(curso);
    }

    @Override
    public Curso buscarPorId(Long id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));
    }
}
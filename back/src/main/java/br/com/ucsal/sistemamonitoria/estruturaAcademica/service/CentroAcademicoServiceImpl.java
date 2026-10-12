package br.com.ucsal.sistemamonitoria.estruturaAcademica.service;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.CentroAcademicoService;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.CentroAcademico;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.Ies;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.repository.CentroAcademicoRepository;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.repository.IesRepository;
import org.springframework.stereotype.Service;

@Service
public class CentroAcademicoServiceImpl implements CentroAcademicoService {

    private final CentroAcademicoRepository centroAcademicoRepository;
    private final IesRepository iesRepository;

    public CentroAcademicoServiceImpl(CentroAcademicoRepository centroAcademicoRepository,
                                      IesRepository iesRepository) {
        this.centroAcademicoRepository = centroAcademicoRepository;
        this.iesRepository = iesRepository;
    }

    @Override
    public CentroAcademico cadastrar(Long iesId, CentroAcademico centroAcademico) {
        Ies ies = iesRepository.findById(iesId)
                .orElseThrow(() -> new RuntimeException("IES não encontrada"));
        centroAcademico.setIes(ies);
        return centroAcademicoRepository.save(centroAcademico);
    }

    @Override
    public CentroAcademico editar(Long id, CentroAcademico centroAcademicoAtualizado) {
        CentroAcademico existente = buscarPorId(id);
        existente.setNome(centroAcademicoAtualizado.getNome());
        existente.setEmailCentral(centroAcademicoAtualizado.getEmailCentral());
        existente.setTelefoneCentral(centroAcademicoAtualizado.getTelefoneCentral());
        existente.setCoordenador(centroAcademicoAtualizado.getCoordenador());
        return centroAcademicoRepository.save(existente);
    }

    @Override
    public void inativar(Long id) {
        CentroAcademico centroAcademico = buscarPorId(id);
        centroAcademico.setAtivo(false);
        centroAcademicoRepository.save(centroAcademico);
    }

    @Override
    public CentroAcademico buscarPorId(Long id) {
        return centroAcademicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Centro Acadêmico não encontrado"));
    }
}
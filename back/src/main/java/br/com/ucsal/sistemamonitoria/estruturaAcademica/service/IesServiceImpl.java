package br.com.ucsal.sistemamonitoria.estruturaAcademica.service;

import br.com.ucsal.sistemamonitoria.estruturaAcademica.IesService;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.entity.Ies;
import br.com.ucsal.sistemamonitoria.estruturaAcademica.repository.IesRepository;
import org.springframework.stereotype.Service;

@Service
public class IesServiceImpl implements IesService {

    private final IesRepository iesRepository;

    public IesServiceImpl(IesRepository iesRepository) {
        this.iesRepository = iesRepository;
    }

    @Override
    public Ies cadastrar(Ies ies) {
        return iesRepository.save(ies);
    }

    @Override
    public Ies editar(Long id, Ies iesAtualizada) {
        Ies existente = buscarPorId(id);
        existente.setNome(iesAtualizada.getNome());
        existente.setEmailCentral(iesAtualizada.getEmailCentral());
        existente.setTelefoneCentral(iesAtualizada.getTelefoneCentral());
        return iesRepository.save(existente);
    }

    @Override
    public void inativar(Long id) {
        Ies ies = buscarPorId(id);
        ies.setAtivo(false);
        iesRepository.save(ies);
    }

    @Override
    public Ies buscarPorId(Long id) {
        return iesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("IES não encontrada"));
    }
}
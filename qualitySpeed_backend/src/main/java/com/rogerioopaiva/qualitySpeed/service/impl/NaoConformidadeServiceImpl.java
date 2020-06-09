package com.rogerioopaiva.qualitySpeed.service.impl;

import com.rogerioopaiva.qualitySpeed.exception.RegraNegocioException;
import com.rogerioopaiva.qualitySpeed.model.entity.NaoConformidade;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusNaoConformidade;
import com.rogerioopaiva.qualitySpeed.model.repository.NaoConformidadeRepository;
import com.rogerioopaiva.qualitySpeed.service.NaoConformidadeService;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class NaoConformidadeServiceImpl implements NaoConformidadeService {

    private NaoConformidadeRepository repository;

    public NaoConformidadeServiceImpl(NaoConformidadeRepository repository) {
        this.repository = repository;
    }


    @Override
    @Transactional
    public NaoConformidade salvar(NaoConformidade naoConformidade) {
        validar(naoConformidade);
        naoConformidade.setStatus(StatusNaoConformidade.PENDENTE);
        return repository.save(naoConformidade);
    }

    @Override
    public NaoConformidade atualizar(NaoConformidade naoConformidade) {
        Objects.requireNonNull(naoConformidade.getId());
        validar(naoConformidade);
        return repository.save(naoConformidade);
    }

    @Override
    public void deletar(NaoConformidade naoConformidade) {
        Objects.requireNonNull(naoConformidade.getId());
        repository.delete(naoConformidade);
    }

    @Override
    public List<NaoConformidade> buscar(NaoConformidade naoConformidadeFiltro) {
        Example example = Example.of( naoConformidadeFiltro,
                ExampleMatcher.matching()
                        .withIgnoreCase()
                        .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) );
        return repository.findAll(example);
    }

    @Override
    public void atualizarStatus(NaoConformidade naoConformidade, StatusNaoConformidade status) {
        naoConformidade.setStatus(status);
        atualizar(naoConformidade);
    }

    @Override
    public void validar(NaoConformidade naoConformidade) {
        if(naoConformidade.getDescricao() == null || naoConformidade.getDescricao().trim().equals("")) {
            throw new RegraNegocioException("Informe a descrição.");
        }

        if (naoConformidade.getSetor() == null || naoConformidade.getSetor().trim().equals("")) {
            throw new RegraNegocioException("Informe o setor.");
        }

        if (naoConformidade.getCausa() == null || naoConformidade.getCausa().trim().equals("")) {
            throw new RegraNegocioException("Informe a causa.");
        }
    }


    @Override
    public Optional<NaoConformidade> obterPorId(Long id) {
        return repository.findById(id);
    }
}

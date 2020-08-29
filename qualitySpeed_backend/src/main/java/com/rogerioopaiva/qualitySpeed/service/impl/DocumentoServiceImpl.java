package com.rogerioopaiva.qualitySpeed.service.impl;

import com.rogerioopaiva.qualitySpeed.exception.RegraNegocioException;
import com.rogerioopaiva.qualitySpeed.model.entity.Documento;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusDocumento;
import com.rogerioopaiva.qualitySpeed.model.repository.DocumentoRepository;
import com.rogerioopaiva.qualitySpeed.service.DocumentoService;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class DocumentoServiceImpl implements DocumentoService {

    private DocumentoRepository repository;


    public DocumentoServiceImpl(DocumentoRepository repository) {
        this.repository = repository;
  }

    @Override
    @Transactional
    public Documento salvar(Documento documento) {
        validar(documento);
        documento.setStatus(StatusDocumento.PENDENTE);
        return repository.save(documento);
    }

    @Override
    @Transactional
    public Documento atualizar(Documento documento) {
        Objects.requireNonNull(documento.getId());
        validar(documento);
        return repository.save(documento);
    }

    @Override
    public void deletar(Documento documento) {
        Objects.requireNonNull(documento.getId());
        repository.delete(documento);
    }

    @Override
    public List<Documento> buscar(Documento documentoFiltro) {
        Example example = Example.of( documentoFiltro,
                ExampleMatcher.matching()
                        .withIgnoreCase()
                        .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING) );
        return repository.findAll(example);
    }

    @Override
    public void atualizarStatus(Documento documento, StatusDocumento status) {
        documento.setStatus(status);
        atualizar(documento);
    }


    @Override
    public void validar(Documento documento) {
        if(documento.getDescricao() == null || documento.getDescricao().trim().equals("")) {
            throw new RegraNegocioException("Informe a Descrição.");
        }

        if(documento.getNomedocumento() == null || documento.getNomedocumento().trim().equals("")) {
            throw new RegraNegocioException("Informe o nome do documento.");
        }

        if (documento.getClassificacao() == null || documento.getClassificacao().trim().equals("")) {
            throw new RegraNegocioException("Informe a classificação.");
        }

        if (documento.getUltimarevisao() == null || documento.getUltimarevisao().toString().equals("")) {
            throw new RegraNegocioException("Informe o data da última Revisão.");
        }

        if (documento.getProxrevisao() == null || documento.getProxrevisao().toString().equals("")) {
            throw new RegraNegocioException("Informe a data da Próxima Revisão.");
        }
    }

    @Override
    public Optional<Documento> obterPorId(Long id) {
        return repository.findById(id);
    }
}

package com.rogerioopaiva.qualitySpeed.service;

import com.rogerioopaiva.qualitySpeed.model.entity.Documento;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusDocumento;

import java.util.List;
import java.util.Optional;

public interface DocumentoService {

    Documento salvar(Documento documento);

    Documento atualizar(Documento documento);

    void deletar(Documento documento);

    List<Documento> buscar(Documento documentoFiltro);

    void atualizarStatus(Documento documento, StatusDocumento status);

    void validar(Documento documento);

    Optional<Documento>obterPorId(Long id);

}

package com.rogerioopaiva.qualitySpeed.service;

import com.rogerioopaiva.qualitySpeed.model.entity.NaoConformidade;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusNaoConformidade;

import java.util.List;
import java.util.Optional;

public interface NaoConformidadeService {

    NaoConformidade salvar(NaoConformidade naoConformidade);

    NaoConformidade atualizar(NaoConformidade naoConformidade);

    void deletar(NaoConformidade naoConformidade);

    List<NaoConformidade> buscar(NaoConformidade naoConformidadeFiltro);

    void validar(NaoConformidade naoConformidade);

    List<NaoConformidade> buscarTodos();

    void atualizarStatus(NaoConformidade naoConformidade, StatusNaoConformidade status);

    Optional<NaoConformidade> obterPorId(Long id);
}

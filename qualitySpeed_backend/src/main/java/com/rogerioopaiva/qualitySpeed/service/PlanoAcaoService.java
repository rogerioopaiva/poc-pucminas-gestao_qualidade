package com.rogerioopaiva.qualitySpeed.service;

import com.rogerioopaiva.qualitySpeed.model.entity.PlanoAcao;

import java.util.List;
import java.util.Optional;

public interface PlanoAcaoService {

    PlanoAcao salvar(PlanoAcao planoAcao);

    PlanoAcao atualizar(PlanoAcao planoAcao);

    void deletar(PlanoAcao planoAcao);

    List<PlanoAcao> buscarTodos();

    List<PlanoAcao> buscar(PlanoAcao planoAcaoFiltro);

    void validar(PlanoAcao planoAcao);

    Optional<PlanoAcao> obterPorId(Long id);
}

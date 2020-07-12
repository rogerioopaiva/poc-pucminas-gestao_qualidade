package com.rogerioopaiva.qualitySpeed.service;

import com.rogerioopaiva.qualitySpeed.model.entity.Colaborador;

import java.util.List;
import java.util.Optional;

public interface ColaboradorService {

    Colaborador salvar(Colaborador colaborador);

    Colaborador atualizar(Colaborador colaborador);

    void deletar(Colaborador colaborador);

    List<Colaborador> buscar( Colaborador colaboradorFiltro);

    List<Colaborador> buscarTodos();

    void validar(Colaborador colaborador);

    Optional<Colaborador>obterPorId(Long id);

}

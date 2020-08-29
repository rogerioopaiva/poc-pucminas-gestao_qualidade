package com.rogerioopaiva.qualitySpeed.service;

import com.rogerioopaiva.qualitySpeed.exception.RegraNegocioException;
import com.rogerioopaiva.qualitySpeed.model.entity.Colaborador;
import com.rogerioopaiva.qualitySpeed.model.repository.ColaboradorRepository;
import com.rogerioopaiva.qualitySpeed.model.repository.ColaboradorRepositoryTest;
import com.rogerioopaiva.qualitySpeed.service.impl.ColaboradorServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.data.domain.Example;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
public class ColaboradorServiceTest {

    @SpyBean
    ColaboradorServiceImpl service;
    @MockBean
    ColaboradorRepository repository;

    @Test
    public void deveSalvarUmColaborador() {

        Colaborador colaboradorASalvar = ColaboradorRepositoryTest.criarColaborador();

        service.salvar(colaboradorASalvar);

        Colaborador colaboradorSalvo = ColaboradorRepositoryTest.criarColaborador();
        colaboradorSalvo.setId(1l);
        Mockito.when(repository.save(colaboradorASalvar)).thenReturn(colaboradorSalvo);

        Colaborador colaborador = service.salvar(colaboradorASalvar);

        Assertions.assertThat(colaborador.getId()).isEqualTo(colaboradorSalvo.getId());
    }

    @Test
    public void naoDeveSalvarUmColaboradorQuandoHouverErroDeValidacao(){
        Colaborador colaboradorASalvar = ColaboradorRepositoryTest.criarColaborador();
        Mockito.doThrow(RegraNegocioException.class).when(service).validar(colaboradorASalvar);

        Assertions.catchThrowableOfType(() -> service.salvar(colaboradorASalvar), RegraNegocioException.class);

        Mockito.verify(repository, Mockito.never()).save(colaboradorASalvar);
    }

    @Test
    public void deveAtualizarUmColaborador() {

        Colaborador colaboradorSalvo = ColaboradorRepositoryTest.criarColaborador();
        colaboradorSalvo.setId(1l);
        Mockito.doNothing().when(service).validar(colaboradorSalvo);

        Mockito.when(repository.save(colaboradorSalvo)).thenReturn(colaboradorSalvo);

        service.atualizar(colaboradorSalvo);

        Mockito.verify(repository, Mockito.times(1)).save(colaboradorSalvo);
    }

    @Test
    public void deveLancarErroAoTentarAtualizarUmColaboradorQueAindaNaoFoiSalvo(){
        Colaborador colaborador = ColaboradorRepositoryTest.criarColaborador();

        Assertions.catchThrowableOfType(() -> service.atualizar(colaborador), NullPointerException.class);

        Mockito.verify(repository, Mockito.never()).save(colaborador);
    }

    @Test
    public void deveDeletarUmColaborador(){
        Colaborador colaborador = ColaboradorRepositoryTest.criarColaborador();
        colaborador.setId(1l);

        service.deletar(colaborador);

        Mockito.verify(repository).delete(colaborador);
    }

    @Test
    public void deveLancarErroAoTentarDeletarUmColabradorQueAindaNaoFoiSalvo(){
        Colaborador colaborador = ColaboradorRepositoryTest.criarColaborador();

        Assertions.catchThrowableOfType(() -> service.deletar(colaborador), NullPointerException.class);

        Mockito.verify(repository, Mockito.never()).delete(colaborador);
    }

    @Test
    public void deveFiltrarColaborador() {
        Colaborador colaborador = ColaboradorRepositoryTest.criarColaborador();
        colaborador.setId(1l);

        List<Colaborador> lista = Arrays.asList(colaborador);
        Mockito.when( repository.findAll(Mockito.any(Example.class))).thenReturn(lista);

        List<Colaborador> resultado = service.buscar(colaborador);

        Assertions
                .assertThat(resultado)
                .isNotEmpty()
                .hasSize(1)
                .contains(colaborador);
    }

    @Test
    public void deveObterUmColaboradorPorID(){

        Long id = 1l;

        Colaborador colaborador = ColaboradorRepositoryTest.criarColaborador();
        colaborador.setId(id);

        Mockito.when(repository.findById(id)).thenReturn(Optional.of(colaborador));

        Optional<Colaborador> resultado = service.obterPorId(id);

        Assertions.assertThat(resultado.isPresent()).isTrue();
    }

    @Test
    public void deveRetornarVazioQuandoOColaboradorNaoExiste(){

        Long id = 1l;

        Colaborador colaborador = ColaboradorRepositoryTest.criarColaborador();
        colaborador.setId(id);

        Mockito.when(repository.findById(id)).thenReturn(Optional.empty());

        Optional<Colaborador> resultado = service.obterPorId(id);

        Assertions.assertThat(resultado.isPresent()).isFalse();
    }

    @Test
    public void deveLancarErrosAoValidarUmCadastro(){
        Colaborador colaborador = new Colaborador();

        Throwable erro = Assertions.catchThrowable( () -> service.validar(colaborador));
        Assertions.assertThat(erro).isInstanceOf(RegraNegocioException.class).hasMessage("Informe o nome do colaborador.");

        colaborador.setNomecolaborador("");

        erro = Assertions.catchThrowable( () -> service.validar(colaborador));
        Assertions.assertThat(erro).isInstanceOf(RegraNegocioException.class).hasMessage("Informe o nome do colaborador.");

        colaborador.setNomecolaborador("Carlos Silva");

        erro = Assertions.catchThrowable( () -> service.validar(colaborador));
        Assertions.assertThat(erro).isInstanceOf(RegraNegocioException.class).hasMessage("Informe o nome do setor.");

        colaborador.setSetor("Financeiro");

        erro = Assertions.catchThrowable( () -> service.validar(colaborador));
        Assertions.assertThat(erro).isInstanceOf(RegraNegocioException.class).hasMessage("Informe o cargo.");

        colaborador.setCargo("Analista de Controladoria");

        erro = Assertions.catchThrowable( () -> service.validar(colaborador));
        Assertions.assertThat(erro).isInstanceOf(RegraNegocioException.class).hasMessage("Informe a Data de Admissão.");

    }

}

package com.rogerioopaiva.qualitySpeed.model.repository;

import com.rogerioopaiva.qualitySpeed.model.entity.Colaborador;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class ColaboradorRepositoryTest {

    @Autowired
    ColaboradorRepository repository;

    @Autowired
    TestEntityManager entityManager;

    @Test
    public void deveSalvarUmColaborador() {
        Colaborador colaborador = criarColaborador();
        colaborador = repository.save(colaborador);

        Assertions.assertThat(colaborador.getId()).isNotNull();
    }

    @Test
    public void deveDeletarUmColaborador() {
        Colaborador colaborador = criarColaborador();
        entityManager.persist(colaborador);

        colaborador = entityManager.find(Colaborador.class, colaborador.getId());

        repository.delete(colaborador);

        Colaborador colaboradorInexistente = entityManager.find(Colaborador.class, colaborador.getId());
        Assertions.assertThat(colaboradorInexistente).isNull();

    }

    @Test
    public void deveBuscarUmColaboradorPorId(){
        Colaborador colaborador = criarEPersistirUmColaborador();

        Optional<Colaborador> colaboradorEncontrado = repository.findById(colaborador.getId());

        Assertions.assertThat(colaboradorEncontrado.isPresent()).isTrue();
    }

    private Colaborador  criarEPersistirUmColaborador(){
        Colaborador colaborador = criarColaborador();
        entityManager.persist(colaborador);
        return colaborador;
    }

    public static Colaborador criarColaborador() {
        return Colaborador.builder()
                .nomecolaborador("Clara Moreira")
                .setor("Financeiro")
                .cargo("Analista de Controladoria")
                .build();
    }
}

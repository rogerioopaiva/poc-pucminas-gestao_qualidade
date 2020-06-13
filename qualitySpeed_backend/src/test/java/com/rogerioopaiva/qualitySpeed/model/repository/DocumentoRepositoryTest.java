package com.rogerioopaiva.qualitySpeed.model.repository;

import com.rogerioopaiva.qualitySpeed.model.entity.Documento;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusDocumento;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.Instant;
import java.util.Date;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DocumentoRepositoryTest {

    @Autowired
    DocumentoRepository repository;

    @Autowired
    TestEntityManager entityManager;

    @Test
    public void deveSalvarUmDocumento() {
        Documento documento = Documento.builder()
                                    .descricao("Licitação de produtos de limpeza")
                                    .nomedocumento("Documento de licitação")
                                    .classificacao("Recursos Humanos")
                                    .revisoes(Long.valueOf(1))
                                    .ultimarevisao(Date.from(Instant.parse("2020-09-03")))
                                    .proxrevisao(Date.from(Instant.parse("2020-03-09")))
                                    .status(StatusDocumento.PENDENTE)
                                    .build();

        repository.save(documento);

        Assertions.assertThat(documento.getId()).isNotNull();
    }


}

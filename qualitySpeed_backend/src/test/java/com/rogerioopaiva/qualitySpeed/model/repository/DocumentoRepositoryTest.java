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

import java.time.LocalDate;

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
                                    .ultimarevisao(LocalDate.of(2020, 02, 10))
                                    .proxrevisao(LocalDate.of(2019,05,03))
                                    .status(StatusDocumento.PENDENTE)
                                    .build();

        repository.save(documento);

        Assertions.assertThat(documento.getId()).isNotNull();
    }


}

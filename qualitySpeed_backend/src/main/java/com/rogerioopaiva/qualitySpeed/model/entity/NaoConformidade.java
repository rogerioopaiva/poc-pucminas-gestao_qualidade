package com.rogerioopaiva.qualitySpeed.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusNaoConformidade;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "naoconformidade", schema = "qualidade")
public class NaoConformidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "dataocorrencia")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date dataocorrencia;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "setor")
    private String setor;


    @Column(name = "causa")
    private String causa;


    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private StatusNaoConformidade status;

}

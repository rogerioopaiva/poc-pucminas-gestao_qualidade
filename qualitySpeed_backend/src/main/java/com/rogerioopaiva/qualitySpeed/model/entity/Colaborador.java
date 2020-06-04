package com.rogerioopaiva.qualitySpeed.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@Table(name = "colaborador", schema = "qualidade")
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nomecolaborador")
    private String nomecolaborador;

    @Column(nullable = false, length = 100, name = "setor")
    private String setor;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "dataadmissao")
    private Date dataadmissao;
}
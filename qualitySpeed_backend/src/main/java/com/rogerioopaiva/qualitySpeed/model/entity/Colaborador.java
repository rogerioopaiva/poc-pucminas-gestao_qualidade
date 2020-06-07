package com.rogerioopaiva.qualitySpeed.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "colaborador", schema = "qualidade")
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
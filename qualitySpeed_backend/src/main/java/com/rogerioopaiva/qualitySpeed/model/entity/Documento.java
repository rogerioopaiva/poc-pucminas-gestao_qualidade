package com.rogerioopaiva.qualitySpeed.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "documento", schema = "qualidade")
public class Documento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "nomedocumento")
    private String nomedocumento;

    @Column(name = "classificacao")
    private String classificacao;

    @ManyToOne
    @JoinColumn(name = "responsavel_id")
    private Colaborador colaborador;

    @Column(name = "revisoes")
    private Integer revisoes;

    @Column(name = "ultimarevisao")
    private Date ultimarevisao;

    @Column(name = "proxrevisao")
    private Date proxrevisao;

    @Column(name = "status")
    private String status;

}

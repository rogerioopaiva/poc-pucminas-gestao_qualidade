package com.rogerioopaiva.qualitySpeed.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "planoacao", schema = "qualidade")
public class PlanoAcao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "dataocorrencia")
    private Date dataocorrencia;

    @Column(name = "oque")
    private String oque;

    @Column(name = "porque")
    private String porque;

    @Column(name = "onde")
    private String onde;

    @Column(name = "quem")
    private String quem;

    @Column(name = "quando")
    private Date quando;

    @Column(name = "como")
    private String como;

    @Column(name = "quantocusta")
    private Double quantocusta;

    @Column(name = "inicio")
    private Date inicio;

    @Column(name = "termino")
    private Date termino;

    @Column(name = "novoprazo")
    private Date novoprazo;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "naoconformidade_id")
    private NaoConformidade naoconformidade;

    @ManyToOne
    @JoinColumn(name = "responsavelacao_id")
    private Colaborador colaborador;
}

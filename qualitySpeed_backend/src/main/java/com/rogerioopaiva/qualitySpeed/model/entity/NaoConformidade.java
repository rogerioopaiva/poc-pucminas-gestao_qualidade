package com.rogerioopaiva.qualitySpeed.model.entity;

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
    private Date dataocorrencia;

    @Column(name = "descricao")
    private String descricacao;

    @Column(name = "setor")
    private String setor;

    @ManyToOne
    @JoinColumn(name = "responsavelcorretiva_id")
    private Colaborador colaborador;

    @Column(name = "causa")
    private String causa;

    @Column(name = "acaocorretiva")
    private String acaocorretiva;

    @Column(name = "status")
    private String status;

    @Column(name = "prazoconclusao")
    private Date prazoconclusao;
}

package com.rogerioopaiva.qualitySpeed.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusDocumento;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "documento", schema = "qualidade")
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    @JoinColumn(name = "id_colaborador")
    private Colaborador colaborador;

    @Column(name = "revisoes")
    private Long revisoes;

    @Column(name = "ultimarevisao")
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date ultimarevisao;

    @Column(name = "proxrevisao")
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date proxrevisao;

    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private StatusDocumento status;



}

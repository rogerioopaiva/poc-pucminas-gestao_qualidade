package com.rogerioopaiva.qualitySpeed.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusPlanoAcao;
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

    @Column(name = "comeco")
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date comeco;

    @Column(name = "termino")
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date termino;

    @Column(name = "tipoacao")
    private String tipoacao;

    @Column(name = "oque")
    private String oque;

    @Column(name = "como")
    private String como;

    @Column(name = "porque")
    private String porque;

    @Column(name = "onde")
    private String onde;

    @Column(name = "quem")
    private Long quem;

    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private StatusPlanoAcao status;
}

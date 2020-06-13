package com.rogerioopaiva.qualitySpeed.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanoacaoDTO {

    private Long id;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date dataocorrencia;
    private String oque;
    private String porque;
    private String onde;
    private String quem;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date quando;
    private String como;
    private Double quantocusta;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date inicio;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date termino;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date novoprazo;
    private String Status;
    private Long id_naoconformidade;
    private Long id_responsavelacao;

}

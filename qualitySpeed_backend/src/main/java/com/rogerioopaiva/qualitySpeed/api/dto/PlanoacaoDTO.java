package com.rogerioopaiva.qualitySpeed.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class PlanoacaoDTO {

    private Long id;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate dataocorrencia;
    private String oque;
    private String porque;
    private String onde;
    private String quem;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate quando;
    private String como;
    private Double quantocusta;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate inicio;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate termino;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate novoprazo;
    private String Status;
    private Long id_naoconformidade;
    private Long id_responsavelacao;

}

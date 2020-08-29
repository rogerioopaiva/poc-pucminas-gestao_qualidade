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
    private Date comeco;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date termino;
    private String tipoacao;
    private String oque;
    private String como;
    private String porque;
    private String onde;
    private Long quem;
    private String Status;
}

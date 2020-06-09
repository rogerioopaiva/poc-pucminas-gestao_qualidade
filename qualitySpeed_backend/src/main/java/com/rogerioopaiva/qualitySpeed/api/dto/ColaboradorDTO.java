package com.rogerioopaiva.qualitySpeed.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ColaboradorDTO {

    private Long id;
    private String nomecolaborador;
    private String setor;
    private String cargo;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate dataadmissao;

}

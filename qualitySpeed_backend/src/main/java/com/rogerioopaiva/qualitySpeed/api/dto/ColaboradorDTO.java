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
public class ColaboradorDTO {

    private Long id;
    private String nomecolaborador;
    private String setor;
    private String cargo;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date dataadmissao;

}

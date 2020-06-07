package com.rogerioopaiva.qualitySpeed.api.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ColaboradorDTO {

    private Long id;
    private String nomecolaborador;
    private String setor;
    private String cargo;
    private Date dataadmissao;

}

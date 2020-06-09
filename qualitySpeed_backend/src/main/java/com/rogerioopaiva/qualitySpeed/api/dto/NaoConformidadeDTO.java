package com.rogerioopaiva.qualitySpeed.api.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class NaoConformidadeDTO {

    private Long id;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate dataocorrencia;
    private String descricao;
    private String setor;
    private Long id_colaboradorcorretiva;
    private String causa;
    private String acaocorretiva;
    private String status;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate prazoconclusao;
}

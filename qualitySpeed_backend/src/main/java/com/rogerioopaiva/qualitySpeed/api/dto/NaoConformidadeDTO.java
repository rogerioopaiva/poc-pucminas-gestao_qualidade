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
public class NaoConformidadeDTO {

    private Long id;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date dataocorrencia;
    private String descricao;
    private String setor;
    private Long id_colaboradorcorretiva;
    private String causa;
    private String acaocorretiva;
    private String status;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date prazoconclusao;
}

package com.rogerioopaiva.qualitySpeed.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class DocumentoDTO {

    private Long id;
    private String descricao;
    private String nomedocumento;
    private String classificacao;
    private Long id_colaborador;
    private Long revisoes;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate ultimarevisao;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private LocalDate proxrevisao;
    private String status;

}

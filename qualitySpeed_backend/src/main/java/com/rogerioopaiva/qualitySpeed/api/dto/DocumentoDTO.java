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
public class DocumentoDTO {

    private Long id;
    private String descricao;
    private String nomedocumento;
    private String classificacao;
    private Long id_colaborador;
    private Long revisoes;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date ultimarevisao;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone="GMT-3")
    private Date proxrevisao;
    private String status;

}

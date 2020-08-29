package com.rogerioopaiva.qualitySpeed.api.resource;

import com.rogerioopaiva.qualitySpeed.api.dto.AtualizaStatusDTO;
import com.rogerioopaiva.qualitySpeed.api.dto.DocumentoDTO;
import com.rogerioopaiva.qualitySpeed.exception.RegraNegocioException;
import com.rogerioopaiva.qualitySpeed.model.entity.Documento;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusDocumento;
import com.rogerioopaiva.qualitySpeed.service.DocumentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documentos")
@RequiredArgsConstructor
public class DocumentoResource {

    private final DocumentoService service;


    @GetMapping
    public ResponseEntity buscar(
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "nomedocumento", required = false) String nomedocumento,
            @RequestParam(value = "classificacao", required = false) String classificacao

            ) {
        Documento documentoFiltro = new Documento();
        documentoFiltro.setDescricao(descricao);
        documentoFiltro.setNomedocumento(nomedocumento);
        documentoFiltro.setClassificacao(classificacao);

        List<Documento> documentos = service.buscar(documentoFiltro);
        return ResponseEntity.ok(documentos);
    }

    @PostMapping
    public ResponseEntity salvar(@RequestBody DocumentoDTO dto) {
        try {
            Documento entidade = converter(dto);
            entidade = service.salvar(entidade);
            return new ResponseEntity(entidade, HttpStatus.CREATED);
        }catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody DocumentoDTO dto) {
        return service.obterPorId(id).map( entity -> {
            try {
                Documento documento = converter(dto);
                documento.setId(entity.getId());
                service.atualizar(documento);
                return ResponseEntity.ok(documento);
            }catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }).orElseGet( () ->
                new ResponseEntity("Documento não encontrado na base de dados.", HttpStatus.BAD_REQUEST));
    }

    @PutMapping("{id}/atualiza-status")
    public ResponseEntity atualizarStatus( @PathVariable Long id, @RequestBody AtualizaStatusDTO dto) {
        return service.obterPorId(id).map( entity -> {
            StatusDocumento statusSelecionado = StatusDocumento.valueOf(dto.getStatus());
            if(statusSelecionado == null) {
                return ResponseEntity.badRequest().body("Não foi possível atualizar o status do documento, envie um status válido.");
            }

            try {
                entity.setStatus(statusSelecionado);
                service.atualizar(entity);
                return ResponseEntity.ok(entity);
            }catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }).orElseGet( () ->
                new ResponseEntity("Documento não encontrado na base de dados", HttpStatus.BAD_REQUEST) );
    }

    @DeleteMapping("{id}")
    public ResponseEntity deletar( @PathVariable("id") Long id) {
        return service.obterPorId(id).map( entidade -> {
            service.deletar(entidade);
            return new ResponseEntity( HttpStatus.NO_CONTENT);
        }).orElseGet( () ->
                new ResponseEntity("Documento não encontrado na base de dados.", HttpStatus.BAD_REQUEST));
    }

    @GetMapping("{id}")
    public ResponseEntity getPorId( @PathVariable("id") Long id ) {
        if(service.obterPorId(id).isPresent()) {
            return new ResponseEntity(service.obterPorId(id).get(), HttpStatus.ACCEPTED);
        }else {
            return new ResponseEntity("Documento não encontrado na base de dados.", HttpStatus.BAD_REQUEST);
        }
    }


    private Documento converter(DocumentoDTO dto) {
        Documento documento = new Documento();
        documento.setId(dto.getId());
        documento.setDescricao(dto.getDescricao());
        documento.setNomedocumento(dto.getNomedocumento());
        documento.setClassificacao(dto.getClassificacao());
        documento.setUltimarevisao(dto.getUltimarevisao());
        documento.setProxrevisao(dto.getProxrevisao());
        documento.setId_colaborador(dto.getId_colaborador());

        if(dto.getStatus() != null) {
            documento.setStatus(StatusDocumento.valueOf(dto.getStatus()));
        }

        return documento;
    }
}

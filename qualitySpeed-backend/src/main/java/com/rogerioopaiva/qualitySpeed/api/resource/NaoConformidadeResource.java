package com.rogerioopaiva.qualitySpeed.api.resource;


import com.rogerioopaiva.qualitySpeed.api.dto.AtualizaStatusDTO;
import com.rogerioopaiva.qualitySpeed.api.dto.NaoConformidadeDTO;
import com.rogerioopaiva.qualitySpeed.exception.RegraNegocioException;
import com.rogerioopaiva.qualitySpeed.model.entity.NaoConformidade;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusNaoConformidade;
import com.rogerioopaiva.qualitySpeed.service.NaoConformidadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/naoconformidades")
@RequiredArgsConstructor
public class NaoConformidadeResource {

    private final NaoConformidadeService service;
 //   private final ColaboradorService colaboradorService;

    @GetMapping
    public ResponseEntity buscar(
            @RequestParam(value = "titulo", required = false) String titulo,
            @RequestParam(value = "setor", required = false) String setor

    ) {
        NaoConformidade naoConformidadeFiltro = new NaoConformidade();
        naoConformidadeFiltro.setTitulo(titulo);
        naoConformidadeFiltro.setSetor(setor);

        List<NaoConformidade> naoConformidades = service.buscar(naoConformidadeFiltro);
        return ResponseEntity.ok(naoConformidades);
    }

    @PostMapping
    public ResponseEntity salvar(@RequestBody NaoConformidadeDTO dto) {
        try {
            NaoConformidade entidade = converter(dto);
            entidade = service.salvar(entidade);
            return new ResponseEntity(entidade, HttpStatus.CREATED);
        }catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody NaoConformidadeDTO dto) {
        return service.obterPorId(id).map( entity -> {
            try {
                NaoConformidade naoConformidade = converter(dto);
                naoConformidade.setId(entity.getId());
                service.atualizar(naoConformidade);
                return ResponseEntity.ok(naoConformidade);
            }catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }).orElseGet( () ->
                new ResponseEntity("Não conformidade não encontrada na base de dados.", HttpStatus.BAD_REQUEST));
    }


    @PutMapping("{id}/atualiza-status")
    public ResponseEntity atualizarStatus( @PathVariable("id") Long id, @RequestBody AtualizaStatusDTO dto) {
        return service.obterPorId(id).map( entity -> {
            StatusNaoConformidade statusSelecionado = StatusNaoConformidade.valueOf(dto.getStatus());
            if(statusSelecionado == null) {
                return ResponseEntity.badRequest().body("Não foi possível atualizar o status da não conformidade, envie um status válido.");
            }

            try {
                entity.setStatus(statusSelecionado);
                service.atualizar(entity);
                return ResponseEntity.ok(entity);
            }catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }).orElseGet( () ->
                new ResponseEntity("Não conformidade não encontrado na base de dados", HttpStatus.BAD_REQUEST) );
    }

    @DeleteMapping("{id}")
    public ResponseEntity deletar( @PathVariable("id") Long id) {
        return service.obterPorId(id).map( entidade -> {
            service.deletar(entidade);
            return new ResponseEntity( HttpStatus.NO_CONTENT);
        }).orElseGet( () ->
                new ResponseEntity("Não conformidade não encontrada na base de dados.", HttpStatus.BAD_REQUEST));
    }

    @GetMapping("{id}")
    public ResponseEntity getPorId( @PathVariable("id") Long id ) {
        if(service.obterPorId(id).isPresent()) {
            return new ResponseEntity(service.obterPorId(id).get(), HttpStatus.ACCEPTED);
        }else {
            return new ResponseEntity("Não conformidade não encontrada na base de dados.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public ResponseEntity getListaNaoConformidade(
    ) {
        List<NaoConformidade> naoConformidades = service.buscarTodos();
        return ResponseEntity.ok(naoConformidades);
    }

    private NaoConformidade converter(NaoConformidadeDTO dto) {
        NaoConformidade naoConformidade = new NaoConformidade();
        naoConformidade.setDataocorrencia(dto.getDataocorrencia());
        naoConformidade.setTitulo(dto.getTitulo());
        naoConformidade.setSetor(dto.getSetor());
        naoConformidade.setCausa(dto.getCausa());

        if(dto.getStatus() != null) {
            naoConformidade.setStatus(StatusNaoConformidade.valueOf(dto.getStatus()));
        }

        return naoConformidade;
    }
}

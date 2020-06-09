package com.rogerioopaiva.qualitySpeed.api.resource;


import com.rogerioopaiva.qualitySpeed.api.dto.AtualizaStatusDTO;
import com.rogerioopaiva.qualitySpeed.api.dto.NaoConformidadeDTO;
import com.rogerioopaiva.qualitySpeed.exception.RegraNegocioException;
import com.rogerioopaiva.qualitySpeed.model.entity.Colaborador;
import com.rogerioopaiva.qualitySpeed.model.entity.NaoConformidade;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusNaoConformidade;
import com.rogerioopaiva.qualitySpeed.service.ColaboradorService;
import com.rogerioopaiva.qualitySpeed.service.NaoConformidadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/naoconformidades")
@RequiredArgsConstructor
public class NaoConformidadeResource {

    private final NaoConformidadeService service;
    private final ColaboradorService colaboradorService;

    @GetMapping
    public ResponseEntity buscar(
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "setor", required = false) String setor,
            @RequestParam(value = "acaocorretiva", required = false) String acaocorretiva,
            @RequestParam("colaboradorcorretiva_id") Long idColaborador
    ) {
        NaoConformidade naoConformidadeFiltro = new NaoConformidade();
        naoConformidadeFiltro.setDescricao(descricao);
        naoConformidadeFiltro.setSetor(setor);
        naoConformidadeFiltro.setAcaocorretiva(acaocorretiva);

        Optional<Colaborador> colaborador = colaboradorService.obterPorId(idColaborador);
        if(!colaborador.isPresent()) {
            return ResponseEntity.badRequest().body("Não foi possível realizar a consulta. Colaborador não encontrado para o Id informado.");
        }else {
            naoConformidadeFiltro.setColaboradorcorretiva(colaborador.get());
        }

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

    private NaoConformidade converter(NaoConformidadeDTO dto) {
        NaoConformidade naoConformidade = new NaoConformidade();
        naoConformidade.setDataocorrencia(dto.getDataocorrencia());
        naoConformidade.setDescricao(dto.getDescricao());
        naoConformidade.setSetor(dto.getSetor());
        naoConformidade.setCausa(dto.getCausa());
        naoConformidade.setAcaocorretiva(dto.getAcaocorretiva());
        naoConformidade.setPrazoconclusao(dto.getPrazoconclusao());

        Colaborador colaborador = colaboradorService
                .obterPorId(dto.getId_colaboradorcorretiva())
                .orElseThrow( () -> new RegraNegocioException("Colaborador não existente para o Id informado."));

        naoConformidade.setColaboradorcorretiva(colaborador);

        if(dto.getStatus() != null) {
            naoConformidade.setStatus(StatusNaoConformidade.valueOf(dto.getStatus()));
        }

        return naoConformidade;
    }
}

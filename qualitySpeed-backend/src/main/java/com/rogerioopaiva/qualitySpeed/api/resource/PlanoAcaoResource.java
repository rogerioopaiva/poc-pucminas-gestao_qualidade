package com.rogerioopaiva.qualitySpeed.api.resource;


import com.rogerioopaiva.qualitySpeed.api.dto.AtualizaStatusDTO;
import com.rogerioopaiva.qualitySpeed.api.dto.PlanoacaoDTO;
import com.rogerioopaiva.qualitySpeed.exception.RegraNegocioException;
import com.rogerioopaiva.qualitySpeed.model.entity.PlanoAcao;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusPlanoAcao;
import com.rogerioopaiva.qualitySpeed.service.PlanoAcaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planoacoes")
@RequiredArgsConstructor
public class PlanoAcaoResource {

    private final PlanoAcaoService service;

    @GetMapping
    public ResponseEntity buscar(
            @RequestParam(value = "oque", required = false) String oque,
            @RequestParam(value = "porque", required = false) String porque,
            @RequestParam(value = "onde", required = false) String onde
            ) {
        PlanoAcao planoAcaoFiltro = new PlanoAcao();
        planoAcaoFiltro.setOque(oque);
        planoAcaoFiltro.setPorque(porque);
        planoAcaoFiltro.setOnde(onde);

        List<PlanoAcao> planoAcao = service.buscar(planoAcaoFiltro);
        return ResponseEntity.ok(planoAcao);
    }

    @PostMapping
    public ResponseEntity salvar (@RequestBody PlanoacaoDTO dto) {
        try {
            PlanoAcao entidade = converter(dto);
            entidade = service.salvar(entidade);
            return new ResponseEntity(entidade, HttpStatus.CREATED);
        }catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody PlanoacaoDTO dto) {
        return service.obterPorId(id).map(entity -> {
            try {
                PlanoAcao planoAcao = converter(dto);
                planoAcao.setId(entity.getId());
                service.atualizar(planoAcao);
                return ResponseEntity.ok(planoAcao);
            }catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }).orElseGet( () -> new ResponseEntity("Plano de ação não encontrado na base de dados.", HttpStatus.BAD_REQUEST));
    }

    @PutMapping("{id}/atualiza-status")
    public ResponseEntity atualizarStatus( @PathVariable("id") Long id, @RequestBody AtualizaStatusDTO dto) {
        return service.obterPorId(id).map( entity -> {
            StatusPlanoAcao statusSelecionado = StatusPlanoAcao.valueOf(dto.getStatus());
            if(statusSelecionado == null) {
                return ResponseEntity.badRequest().body("Não foi possível atualizar o status do plano de ação, envie um status válido.");
            }

            try {
                entity.setStatus(statusSelecionado);
                service.atualizar(entity);
                return ResponseEntity.ok(entity);
            }catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }).orElseGet( () ->
                new ResponseEntity("Plano de ação não encontrado na base de dados", HttpStatus.BAD_REQUEST) );
    }

    @DeleteMapping("{id}")
    public ResponseEntity deletar( @PathVariable("id") Long id ) {
        return service.obterPorId(id).map( entidade -> {
            service.deletar(entidade);
            return new ResponseEntity( HttpStatus.NO_CONTENT);
        }).orElseGet( () ->
                new ResponseEntity("Plano de ação não encontrado na base de dados.", HttpStatus.BAD_REQUEST));
    }

    @GetMapping("{id}")
    public ResponseEntity getPorId( @PathVariable("id") Long id ) {
        if(service.obterPorId(id).isPresent()) {
            return new ResponseEntity(service.obterPorId(id).get(), HttpStatus.ACCEPTED);
        }else {
            return new ResponseEntity("Colaborador não encontrado na base de dados.", HttpStatus.BAD_REQUEST);
        }
    }

    private PlanoAcao converter(PlanoacaoDTO dto) {
        PlanoAcao planoAcao = new PlanoAcao();
        planoAcao.setComeco(dto.getComeco());
        planoAcao.setTermino(dto.getTermino());
        planoAcao.setTipoacao(dto.getTipoacao());
        planoAcao.setOque(dto.getOque());
        planoAcao.setComo(dto.getComo());
        planoAcao.setPorque(dto.getPorque());
        planoAcao.setOnde(dto.getOnde());
        planoAcao.setQuem(dto.getQuem());

        if(dto.getStatus() != null) {
            planoAcao.setStatus(StatusPlanoAcao.valueOf(dto.getStatus()));
        }

        return planoAcao;
    }
}
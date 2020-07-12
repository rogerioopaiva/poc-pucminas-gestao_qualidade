package com.rogerioopaiva.qualitySpeed.api.resource;


import com.rogerioopaiva.qualitySpeed.api.dto.AtualizaStatusDTO;
import com.rogerioopaiva.qualitySpeed.api.dto.PlanoacaoDTO;
import com.rogerioopaiva.qualitySpeed.exception.RegraNegocioException;
import com.rogerioopaiva.qualitySpeed.model.entity.Colaborador;
import com.rogerioopaiva.qualitySpeed.model.entity.NaoConformidade;
import com.rogerioopaiva.qualitySpeed.model.entity.PlanoAcao;
import com.rogerioopaiva.qualitySpeed.model.enums.StatusPlanoAcao;
import com.rogerioopaiva.qualitySpeed.service.ColaboradorService;
import com.rogerioopaiva.qualitySpeed.service.NaoConformidadeService;
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
    private final ColaboradorService colaboradorService;
    private final NaoConformidadeService naoConformidadeService;

    @GetMapping
    public ResponseEntity buscar(
            @RequestParam("Oque") String oque,
            @RequestParam(value = "porque", required = false) String porque,
            @RequestParam(value = "onde", required = false) String onde,
            @RequestParam(value = "quem", required = false) String quem

            ) {
        PlanoAcao planoAcaoFiltro = new PlanoAcao();
        planoAcaoFiltro.setOque(oque);
        planoAcaoFiltro.setPorque(porque);
        planoAcaoFiltro.setOnde(onde);
        planoAcaoFiltro.setQuem(quem);

        List<PlanoAcao> planoAcaos = service.buscar(planoAcaoFiltro);
        return ResponseEntity.ok(planoAcaos);
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

    private PlanoAcao converter(PlanoacaoDTO dto) {
        PlanoAcao planoAcao = new PlanoAcao();
        planoAcao.setDataocorrencia(dto.getDataocorrencia());
        planoAcao.setOque(dto.getOque());
        planoAcao.setPorque(dto.getPorque());
        planoAcao.setOnde(dto.getOnde());
        planoAcao.setQuem(dto.getQuem());
        planoAcao.setQuando(dto.getQuando());
        planoAcao.setComo(dto.getComo());
        planoAcao.setQuantocusta(dto.getQuantocusta());
        planoAcao.setTermino(dto.getTermino());

        Colaborador colaborador = colaboradorService
                .obterPorId(dto.getId_responsavelacao())
                .orElseThrow( () -> new RegraNegocioException("Responsável não existente para o Id informado."));

        planoAcao.setColaborador(colaborador);

            NaoConformidade naoConformidade = naoConformidadeService
                .obterPorId(dto.getId_naoconformidade())
                .orElseThrow( () -> new RegraNegocioException("Não conformidade não existente para o id informado."));

            planoAcao.setNaoconformidade(naoConformidade);

        if(dto.getStatus() != null) {
            planoAcao.setStatus(StatusPlanoAcao.valueOf(dto.getStatus()));
        }

        return planoAcao;
    }
}
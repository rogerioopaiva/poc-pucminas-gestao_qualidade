package com.rogerioopaiva.qualitySpeed.api.resource;

import com.rogerioopaiva.qualitySpeed.api.dto.ColaboradorDTO;
import com.rogerioopaiva.qualitySpeed.exception.RegraNegocioException;
import com.rogerioopaiva.qualitySpeed.model.entity.Colaborador;
import com.rogerioopaiva.qualitySpeed.service.ColaboradorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colaborador")
@RequiredArgsConstructor
public class ColaboradorResource {

    private final ColaboradorService service;

    @GetMapping
    public ResponseEntity buscar(
            @RequestParam("nomecolaborador") String nomecolaborador,
            @RequestParam(value = "setor", required = false) String setor,
            @RequestParam(value = "cargo", required = false) String cargo
    ) {
        Colaborador colaboradorFiltro = new Colaborador();
        colaboradorFiltro.setNomecolaborador(nomecolaborador);
        colaboradorFiltro.setSetor(setor);
        colaboradorFiltro.setCargo(cargo);

        List<Colaborador> colaboradores = service.buscar(colaboradorFiltro);
        return ResponseEntity.ok(colaboradores);
    }

    @PostMapping
    public ResponseEntity salvar (@RequestBody ColaboradorDTO dto) {
        try {
            Colaborador entidade = converter(dto);
            entidade = service.salvar(entidade);
            return new ResponseEntity(entidade, HttpStatus.CREATED);
        }catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody ColaboradorDTO dto) {
       return service.obterPorId(id).map(entity -> {
           try {
               Colaborador colaborador = converter(dto);
               colaborador.setId(entity.getId());
               service.atualizar(colaborador);
               return ResponseEntity.ok(colaborador);
           }catch (RegraNegocioException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
           }
        }).orElseGet( () -> new ResponseEntity("Colaborador não encontrado na base de dados.", HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("{id}")
    public ResponseEntity deletar( @PathVariable("id") Long id ) {
        return service.obterPorId(id).map( entidade -> {
            service.deletar(entidade);
            return new ResponseEntity( HttpStatus.NO_CONTENT);
        }).orElseGet( () ->
                new ResponseEntity("Colaborador não encontrado na base de dados.", HttpStatus.BAD_REQUEST));
    }

    private Colaborador converter(ColaboradorDTO dto) {
        Colaborador colaborador = new Colaborador();
        colaborador.setId(dto.getId());
        colaborador.setNomecolaborador(dto.getNomecolaborador());
        colaborador.setSetor(dto.getSetor());
        colaborador.setCargo(dto.getCargo());
        colaborador.setDataadmissao(dto.getDataadmissao());

        return colaborador;
    }
}

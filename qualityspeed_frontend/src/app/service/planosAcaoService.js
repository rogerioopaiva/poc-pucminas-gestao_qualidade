import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao'

export default class dService extends ApiService {
                 constructor() {
                   super("/api/planoacoes");
                 }

                 obterPorId(id) {
                   return this.get(`/${id}`);
                 }

                 obterListaTipoAcao() {
                   return [
                     { value: "", label: "Selecione..." },
                     { value: "CORRETIVA", label: "Corretiva" },
                     { value: "PREVENTIVA", label: "Preventiva" },
                   ];
                 }

                 alterarStatus(id, status) {
                   return this.put(`/${id}/atualiza-status`, { status });
                 }

                 validar(planoacao) {
                   const erros = [];

                   if (!planoacao.oque) {
                     erros.push("Informe o que aconteceu.");
                   }

                   if (!planoacao.porque) {
                     erros.push("Informe o porque.");
                   }

                   if (!planoacao.onde) {
                     erros.push("Informe onde.");
                   }

                   if (!planoacao.quem) {
                     erros.push("Informe quem.");
                   }

                   if (erros && erros.length > 0) {
                     throw new ErroValidacao(erros);
                   }
                 }

                 salvar(planoacao) {
                   return this.post("/", planoacao);
                 }

                 atualizar(planoacao) {
                   return this.put(`/${planoacao.id}`, planoacao);
                 }

                 consultar(planoacaoFiltro) {
                   let params = `?oque=${planoacaoFiltro.oque}`;

                   if (planoacaoFiltro.como) {
                     params = `${params}&como=${planoacaoFiltro.como}`;
                   }

                   if (planoacaoFiltro.porque) {
                     params = `${params}&porque=${planoacaoFiltro.porque}`;
                   }

                   return this.get(params);
                 }

                 deletar(id) {
                   return this.delete(`/${id}`);
                 }
               }
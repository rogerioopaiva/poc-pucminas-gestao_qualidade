import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao'

export default class colaboradorService extends ApiService {
                 constructor() {
                   super("/api/colaborador");
                 }

                 obterPorId(id) {
                   return this.get(`/${id}`);
                 }

                 alterarStatus(id, status) {
                   return this.put(`/${id}/atualiza-status`, { status });
                 }

                 validar(colaborador) {
                   const erros = [];

                   if (!colaborador.nomecolaborador) {
                     erros.push("Informe o nome do colaborador.");
                   }

                   if (!colaborador.setor) {
                     erros.push("Informe o Setor.");
                   }

                   if (!colaborador.cargo) {
                     erros.push("Informe o cargo.");
                   }

                   if (erros && erros.length > 0) {
                     throw new ErroValidacao(erros);
                   }
                 }

                 salvar(colaboradores) {
                   return this.post("/", colaboradores);
                 }

                 atualizar(colaborador) {
                   return this.put(`/${colaborador.id}`, colaborador);
                 }

                 consultar(colaboradorFiltro) {
                   let params = `?nomecolaborador=${colaboradorFiltro.nomecolaborador}`;

                   if (colaboradorFiltro.setor) {
                     params = `${params}&setor=${colaboradorFiltro.setor}`;
                   }

                   if (colaboradorFiltro.cargo) {
                     params = `${params}&cargo=${colaboradorFiltro.cargo}`;
                   }

                   return this.get(params);
                 }

                 deletar(id) {
                   return this.delete(`/${id}`);
                 }
               }
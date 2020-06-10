import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao'

export default class colaboradorService extends ApiService {
                 constructor() {
                   super("/api/colaborador");
                 }

                obterPorId(id) {
                   return this.get(`/${id}`);
                 }

                alterarStatus(id, status){
                    return this.put(`/${id}/atualiza-status`, { status })
                }

                validar(colaborador){
                    const erros = [];

                if (!colaborador.nome) {
                    erros.push("Informe o nome do colaborador.")
                }

                if (!colaborador.setor) {
                    erros.push("Informe o Setor.");
                }

                if (!colaborador.cargo) {
                    erros.push("Informe o cargo.");
                }

                // if (!colaborador.valor) {
                //     erros.push("Informe o Valor.");
                // }

                if (!colaborador.nivel) {
                    erros.push("Informe o Nível do colaborador.");
                }
                
                if(erros && erros.length > 0){
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
                   let params = `?ano=${colaboradorFiltro.ano}`;

                   if (colaboradorFiltro.mes) {
                     params = `${params}&mes=${colaboradorFiltro.mes}`;
                   }

                   if (colaboradorFiltro.nivelColaborador) {
                     params = `${params}&tipo=${colaboradorFiltro.nivelColaborador}`;
                   }

                   if (colaboradorFiltro.status) {
                     params = `${params}&status=${colaboradorFiltro.status}`;
                   }

                   if (colaboradorFiltro.usuario) {
                     params = `${params}&usuario=${colaboradorFiltro.usuario}`;
                   }

                   if (colaboradorFiltro.descricao) {
                     params = `${params}&descricao=${colaboradorFiltro.descricao}`;
                   }

                   return this.get(params);
                 }

                 deletar(id) {
                   return this.delete(`/${id}`);
                 }
               }
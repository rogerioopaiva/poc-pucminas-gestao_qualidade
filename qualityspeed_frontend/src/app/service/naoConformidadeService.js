import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao'

export default class dService extends ApiService {
                 constructor() {
                   super("/api/naoconformidade");
                 }

                obterPorId(id) {
                   return this.get(`/${id}`);
                 }

                alterarStatus(id, status){
                    return this.put(`/${id}/atualiza-status`, { status })
                }

                validar(naoconformidade){
                    const erros = [];

                if (!naoconformidade.descricao) {
                    erros.push("Informe a descrição.")
                }

                if (!naoconformidade.nomenaoconformidade) {
                    erros.push("Informe o nome da não conformidade.");
                }

                if (!naoconformidade.classificacao) {
                    erros.push("Informe a classificacao.");
                }

                if(erros && erros.length > 0){
                    throw new ErroValidacao(erros);
                }
            }

                 salvar(naoconformidade) {
                   return this.post("/", naoconformidade);
                 }

                 atualizar(naoconformidade) {
                   return this.put(`/${naoconformidade.id}`, naoconformidade);
                 }

                 consultar(naoconformidadeFiltro) {
                   let params = `?ano=${naoconformidadeFiltro.ano}`;

                   if (naoconformidadeFiltro.mes) {
                     params = `${params}&mes=${naoconformidadeFiltro.mes}`;
                   }

                   if (naoconformidadeFiltro.tipoDocumento) {
                     params = `${params}&tipo=${naoconformidadeFiltro.tipoDocumento}`;
                   }

                   if (naoconformidadeFiltro.status) {
                     params = `${params}&status=${naoconformidadeFiltro.status}`;
                   }

                   if (naoconformidadeFiltro.usuario) {
                     params = `${params}&usuario=${naoconformidadeFiltro.usuario}`;
                   }

                   if (naoconformidadeFiltro.descricao) {
                     params = `${params}&descricao=${naoconformidadeFiltro.descricao}`;
                   }

                   return this.get(params);
                 }

                 deletar(id) {
                   return this.delete(`/${id}`);
                 }
               }
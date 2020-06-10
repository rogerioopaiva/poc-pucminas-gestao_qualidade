import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao'

export default class documentoService extends ApiService {
                 constructor() {
                   super("/api/documento");
                 }

                obterPorId(id) {
                   return this.get(`/${id}`);
                 }

                alterarStatus(id, status){
                    return this.put(`/${id}/atualiza-status`, { status })
                }

                validar(documento){
                    const erros = [];

                if (!documento.descricao) {
                    erros.push("Informe a descrição.")
                }

                if (!documento.nomedocumento) {
                    erros.push("Informe o nome do documento.");
                }

                if (!documento.classificacao) {
                    erros.push("Informe a classificacao.");
                }

                if(erros && erros.length > 0){
                    throw new ErroValidacao(erros);
                }
            }

                 salvar(documento) {
                   return this.post("/", documento);
                 }

                 atualizar(documento) {
                   return this.put(`/${documento.id}`, documento);
                 }

                 consultar(documentoFiltro) {
                   let params = `?ano=${documentoFiltro.ano}`;

                   if (documentoFiltro.mes) {
                     params = `${params}&mes=${documentoFiltro.mes}`;
                   }

                   if (documentoFiltro.tipoDocumento) {
                     params = `${params}&tipo=${documentoFiltro.tipoDocumento}`;
                   }

                   if (documentoFiltro.status) {
                     params = `${params}&status=${documentoFiltro.status}`;
                   }

                   if (documentoFiltro.usuario) {
                     params = `${params}&usuario=${documentoFiltro.usuario}`;
                   }

                   if (documentoFiltro.descricao) {
                     params = `${params}&descricao=${documentoFiltro.descricao}`;
                   }

                   return this.get(params);
                 }

                 deletar(id) {
                   return this.delete(`/${id}`);
                 }
               }
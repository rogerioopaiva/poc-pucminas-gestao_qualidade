import ApiService from '../apiservice'
import ErroValidacao from '../exception/erroValidacao'

export default class documentoService extends ApiService {
                 constructor() {
                   super("/api/documentos");
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
                    erros.push("Informe a descrição do documento.")
                }

                if (!documento.nomedocumento) {
                    erros.push("Informe o nome do documento.");
                }

                if (!documento.classificacao) {
                    erros.push("Informe a classificaçao.");
                }

                if(erros && erros.length > 0){
                    throw new ErroValidacao(erros);
                }
            }

                 salvar(documentos) {
                   return this.post("/", documentos);
                 }

                 atualizar(documentos) {
                   return this.put(`/${documentos.id}`, documentos);
                 }

                 consultar(documentoFiltro) {
                   let params = `?`;

                   if (documentoFiltro.descricao) {
                     params = `${params}&descricao=${documentoFiltro.descricao}`;
                   }

                   if (documentoFiltro.nomedocumento) {
                     params = `${params}&nomedocumento=${documentoFiltro.nomedocumento}`;
                   }

                   if (documentoFiltro.classificacao) {
                     params = `${params}&classificacao=${documentoFiltro.classificacao}`;
                   }

                  //  if (documentoFiltro.status) {
                  //    params = `${params}&status=${documentoFiltro.status}`;
                  //  }

                  //  if (documentoFiltro.usuario) {
                  //    params = `${params}&usuario=${documentoFiltro.usuario}`;
                  //  }

                  //  if (documentoFiltro.descricao) {
                  //    params = `${params}&descricao=${documentoFiltro.descricao}`;
                  //  }

                   return this.get(params);
                 }

                 deletar(id) {
                   return this.delete(`/${id}`);
                 }
               }
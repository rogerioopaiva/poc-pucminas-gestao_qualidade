import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao'

export default class naoConformidadeService extends ApiService {
                 constructor() {
                   super("/api/naoconformidades");
                 }

                obterPorId(id) {
                   return this.get(`/${id}`);
                 }

                alterarStatus(id, status){
                    return this.put(`/${id}/atualiza-status`, { status })
                }

                validar(naoconformidade){
                    const erros = [];

                if (!naoconformidade.titulo) {
                    erros.push("Informe o título.")
                }

                if (!naoconformidade.setor) {
                  erros.push("Informe o setor.");
                }

                if (!naoconformidade.causa) {
                  erros.push("Informe a causa.");
                }

                if(erros && erros.length > 0){
                    throw new ErroValidacao(erros);
                }
            }

                 salvar(naoconformidades) {
                   return this.post("/", naoconformidades);
                 }

                 atualizar(naoconformidades) {
                   return this.put(`/${naoconformidades.id}`, naoconformidades);
                 }

                 consultar(naoconformidadeFiltro) {
                  let params = `?`;

                  if (naoconformidadeFiltro.titulo) {
                    params = `${params}&titulo=${naoconformidadeFiltro.titulo}`;
                  }

                   if (naoconformidadeFiltro.setor) {
                     params = `${params}&setor=${naoconformidadeFiltro.setor}`;
                   }

                   return this.get(params);
                 }

                 deletar(id) {
                   return this.delete(`/${id}`);
                 }
               }
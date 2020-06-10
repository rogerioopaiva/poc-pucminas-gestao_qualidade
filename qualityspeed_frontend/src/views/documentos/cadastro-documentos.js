import React from 'react'

import Card from '../../components/card'

import { withRouter } from 'react-router-dom'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import * as messages from '../../components/toastr'
import DocumentoService from '../../app/service/documentoService'
import LocalSotrageService from '../../app/service/localstorageService'

class CadastroDocumentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        nomedocumento: '', 
        classificacao: '',
        revisoes: '',
        status: '',
        ultimarevisao: null,
        proximarevisao: null,
        usuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new DocumentoService();
    }

    componentDidMount(){
        const params = this.props.match.params

        if(params.id){
            this.service
            .obterPorId(params.id)
            .then(response => {
                this.setState({...response.data, atualizando: true} )
            })
            .catch(erros => {
                messages.mensagemErro(erros.response.data)
            })
        }
    }

    submit = () => {
        const usuarioLogado = LocalSotrageService.obterItem('_usuario_logado')
        
        const { descricao, nomedocumento, classificacao, revisoes} = this.state;
        const documento = { descricao, nomedocumento, classificacao, revisoes, usuario: usuarioLogado.id };

        try{
            this.service.validar(documento)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
            .salvar(documento)
            .then(response => {
                this.props.history.push('/consulta-documentos')
                messages.mensagemSucesso('Documento cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const { descricao, nomedocumento, classificacao, revisoes, usuario, status, id} = this.state;
        const documento = { descricao, nomedocumento, classificacao, revisoes, usuario, status, id };

        this.service
          .atualizar(documento)
          .then(response => {
            this.props.history.push("/consulta-documentos");
            messages.mensagemSucesso("Documento atualizado com sucesso!");
          })
          .catch(error => {
            messages.mensagemErro(error.response.data);
          });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    render(){

        return (
          <Card
            title={
              this.state.atualizando
                ? "Atualização de documento"
                : "Cadastro de Documento"
            }
          >
            <div className="row">
              <div className="col-md-12">
                <FormGroup id="inputDescricao" label="Descrição: *">
                  <input
                    id="inputDescricao"
                    type="text"
                    className="form-control"
                    name="descricao"
                    value={this.state.descricao}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormGroup id="inputNomeDocumento" label="Nome do documento: *">
                  <input
                    id="inputNomeDocumento"
                    type="text"
                    name="nomedocumento"
                    value={this.state.nomedocumento}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </FormGroup>
              </div>
              <div className="col-=md-6">
                <FormGroup id="inputClassificacao" label="Classificação: *">
                  <input
                    id="inputClassificacao"
                    type="text"
                    name="classificacao"
                    value={this.state.classificacao}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                {this.state.atualizando ? (
                  <button onClick={this.atualizar} className="btn btn-success">
                    <i className="pi pi-refresh"></i> Atualizar
                  </button>
                ) : (
                  <button onClick={this.submit} className="btn btn-success">
                    <i className="pi pi-save"></i> Salvar
                  </button>
                )}
                <button
                  onClick={(e) => this.props.history.push("/home")}
                  className="btn btn-danger"
                >
                  <i className="pi pi-times"></i> Cancelar
                </button>
              </div>
            </div>
          </Card>
        );
    } 

}

export default withRouter(CadastroDocumentos);
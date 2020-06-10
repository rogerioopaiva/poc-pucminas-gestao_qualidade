import React from 'react'

import Card from '../../components/card'

import { withRouter } from 'react-router-dom'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import * as messages from '../../components/toastr'
import ColaboradorService from '../../app/service/colaboradorService'
import LocalSotrageService from '../../app/service/localstorageService'

class CadastroColaboradores extends React.Component {

    state = {
        id: null,
        nome: '',
        setor: '', 
        cargo: '',
        status: '',
        usuario: null,
        atualizando: false,
        date: null
    }

    constructor(){
        super();
        this.service = new ColaboradorService();
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
        
        const { nome, setor, cargo, nivel} = this.state;
        const colaborador = { nome, setor, cargo, nivel, usuario: usuarioLogado.id };

        try{
            this.service.validar(colaborador)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
            .salvar(colaborador)
            .then(response => {
                this.props.history.push('/consulta-colaboradores')
                messages.mensagemSucesso('Colaborador cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const { nome, setor, cargo, status, usuario, id} = this.state;
        const colaborador = { nome, setor, cargo, usuario, status, id };

        this.service
          .atualizar(colaborador)
          .then(response => {
            this.props.history.push("/consulta-colaboradores");
            messages.mensagemSucesso("Colaboradores atualizado com sucesso!");
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
                ? "Atualização de colaborador"
                : "Cadastro de Colaborador"
            }
          >
            <div className="row">
              <div className="col-md-12">
                <FormGroup id="inputnome" label="Nome do colaborador: *">
                  <input
                    id="inputnome"
                    type="text"
                    className="form-control"
                    name="nome"
                    value={this.state.nome}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormGroup id="inputSetor" label="Setor: *">
                  <input
                    id="inputSetor"
                    type="text"
                    name="setor"
                    value={this.state.setor}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </FormGroup>
              </div>
              <div className="col-=md-6">
                <FormGroup id="inputCargo" label="Cargo: *">
                  <SelectMenu
                    id="inputCargo"
                    value={this.state.cargo}
                    onChange={this.handleChange}
                    name="cargo"
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

export default withRouter(CadastroColaboradores);
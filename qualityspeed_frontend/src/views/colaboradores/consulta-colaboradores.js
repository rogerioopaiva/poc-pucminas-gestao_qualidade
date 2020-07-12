import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import ColaboradoresTable from './colaboradoresTable'
import ColaboradorService from '../../app/service/colaboradorService'


import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaColaboradores extends React.Component{

    state = {
        nomecolaborador: '',
        setor: '',
        cargo: '',
        showConfirmDialog: false,
        colaboradorDeletar: {},
        colaboradores: []
    }

    constructor(){
        super();
        this.service = new ColaboradorService();
    }

    buscar = () => {
        if(!this.state.nomecolaborador){
            messages.mensagemErro('O preenchimento do campo Nome do colaborador é obrigatório.')
            return false;
        }

        const colaboradorFiltro = {
            nomecolaborador: this.state.nomecolaborador,
            setor: this.state.setor,
            cargo: this.state.cargo,
        }

        this.service
            .consultar(colaboradorFiltro)
            .then( resposta => {
                const lista = resposta.data;
                if(lista.length < 1){
                    messages.mensagemAlerta("Nenhum resultado encontrado.")
                } 
                this.setState({ colaboradores: lista })
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-colaboradores/${id}`)
    }

    abrirConfirmacao = (colaborador) => {
        this.setState({showConfirmDialog : true, colaboradorDeletar: colaborador})
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, colaboradorDeletar: {}})
    }

    deletar = () => {
        this.service
            .deletar(this.state.colaboradorDeletar.id)
            .then(response => {
                const colaboradores = this.state.colaboradores;
                const index = colaboradores.indexOf(this.state.colaboradorDeletar)
                colaboradores.splice(index, 1);
                this.setState( {colaboradores, showConfirmDialog: false })
                messages.mensagemSucesso('Colaborador deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o colaborador.')
            })
    }

    prepararFormularioCadastro = () => {
        this.props.history.push('/cadastro-colaboradores')
    }

    alterarStatus = (colaborador, status) => {
        this.service
            .alterarStatus(colaborador.id, status)
            .then( response => {
            const colaboradores = this.state.colaboradores;
            const index = colaboradores.indexOf(colaborador);
            if(index !== -1){
                colaborador['status'] = status;
                colaborador[index] = colaborador
                this.setState({colaborador});
            }  
            messages.mensagemSucesso("Status atualizado com sucesso!")  
        })
    }

    render(){

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={(this.deletar)} />
                <Button label="Cancelar" icon="pi pi-times" onClick={(this.cancelarDelecao)} 
                        className="p-button-secondary"/>
            </div>
        );

        return (
          <Card title="Consulta Colaboradores">
            <div className="row">
              <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup htmlFor="inputNome" label="Nome do Colaborador: *">
                    <input
                      type="text"
                      className="form-control"
                      id="inputNome"
                      value={this.state.nomecolaborador}
                      onChange={(e) => this.setState({ nomecolaborador: e.target.value })}
                      placeholder="Digite o Nome"
                    />
                  </FormGroup>

                  <FormGroup htmlFor="inputSetor" label="Setor: *">
                    <input
                      type="text"
                      className="form-control"
                      id="inputSetor"
                      value={this.state.setor}
                      onChange={(e) => this.setState({ setor: e.target.value })}
                      placeholder="Digite o Setor"
                    />
                  </FormGroup>

                  <FormGroup htmlFor="inputCargo" label="Cargo: *">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCargo"
                      value={this.state.cargo}
                      onChange={(e) => this.setState({ cargo: e.target.value })}
                      placeholder="Digite o Cargo"
                    />
                  </FormGroup>

                  <button
                    onClick={this.buscar}
                    type="button"
                    className="btn btn-success"
                  >
                    <i className="pi pi-search"></i> Buscar
                  </button>
                  <button
                    onClick={this.prepararFormularioCadastro}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="pi pi-plus"></i> Cadastrar
                  </button>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <div className="bs-component">
                  <ColaboradoresTable
                    colaboradores={this.state.colaboradores}
                    deleteAction={this.abrirConfirmacao}
                    editarAction={this.editar}
                    alterarStatus={this.alterarStatus}
                  />
                </div>
              </div>
            </div>
            <div>
              <Dialog
                header="Godfather I"
                visible={this.state.showConfirmDialog}
                style={{ width: "50vw" }}
                footer={confirmDialogFooter}
                modal={true}
                onHide={() => this.setState({ showConfirmDialog: false })}
              >
                Confirma a exclusão deste Colaborador?
              </Dialog>
            </div>
          </Card>
        );
    }
}

export default withRouter(ConsultaColaboradores);
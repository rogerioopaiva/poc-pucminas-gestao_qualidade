import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import NaoConformidadeTable from './naoconformidadeTable'
import NaoConformidadeService from '../../app/service/naoConformidadeService'
import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaNaoConformidade extends React.Component {

    state = {
        descricao: '',
        setor: '',
        acaocorretiva: '',
        showConfirmDialog: false,
        naoconformidadeDeletar: {},
        naoconformidades: []
    }

    constructor() {
        super();
        this.service = new NaoConformidadeService();
    }

    buscar = () => {
        if (!this.state.descricao) {
            messages.mensagemErro('O preenchimento do campo Descrição é obrigatório.')
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const naoConformidadeFiltro = {
            descricao: this.state.descricao,
            setor: this.state.setor,
            acaocorretiva: this.state.acaocorretiva,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(naoConformidadeFiltro)
            .then(resposta => {
                const lista = resposta.data;
                if (lista.length < 1) {
                    messages.mensagemAlerta("Nenhum resultado encontrado.")
                }
                this.setState({ naoconformidades: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-naoconformidades/${id}`)
    }

    abrirConfirmacao = (naoconformidade) => {
        this.setState({ showConfirmDialog: true, naoconformidadeDeletar: naoconformidade })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, naoconformidadeDeletar: {} })
    }

    deletar = () => {
        this.service
            .deletar(this.state.naoconformidadeDeletar.id)
            .then(response => {
                const naoconformidades = this.state.naoconformidades;
                const index = naoconformidades.indexOf(this.state.naoconformidadeDeletar)
                naoconformidades.splice(index, 1);
                this.setState({ naoconformidades, showConfirmDialog: false })
                messages.mensagemSucesso('Não conformidade deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o naoconformidade.')
            })
    }

    prepararFormularioCadastro = () => {
        this.props.history.push('/cadastro-naoconformidades')
    }

    alterarStatus = (naoconformidade, status) => {
        this.service
            .alterarStatus(naoconformidade.id, status)
            .then(response => {
                const naoconformidades = this.state.naoconformidades;
                const index = naoconformidades.indexOf(naoconformidade);
                if (index !== -1) {
                    naoconformidade['status'] = status;
                    naoconformidade[index] = naoconformidade
                    this.setState({ naoconformidade });
                }
                messages.mensagemSucesso("Status atualizado com sucesso!")
            })
    }

    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={(this.deletar)} />
                <Button label="Cancelar" icon="pi pi-times" onClick={(this.cancelarDelecao)}
                    className="p-button-secondary" />
            </div>
        );

        return (
            <Card title="Consulta Não Conformidade">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a Descrição" />
                            </FormGroup>
                            <FormGroup htmlFor="inputClass" label="Setor: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputClass"
                                    value={this.state.classificacao}
                                    onChange={e => this.setState({ classificacao: e.target.value })}
                                    placeholder="Digite a descrição" />
                            </FormGroup>
                             <FormGroup htmlFor="inputClass" label="Ação Corretiva: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputClass"
                                    value={this.state.classificacao}
                                    onChange={e => this.setState({ classificacao: e.target.value })}
                                    placeholder="Digite a descrição" />
                            </FormGroup>


                            <button onClick={this.buscar}
                                type="button"
                                className="btn btn-success">
                                <i className="pi pi-search"></i> Buscar
                                    </button>
                            <button onClick={this.prepararFormularioCadastro}
                                type="button"
                                className="btn btn-danger">
                                <i className="pi pi-plus"></i> Cadastrar
                                    </button>

                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <NaoConformidadeTable
                                naoconformidades={this.state.naoconformidades}
                                deleteAction={this.abrirConfirmacao}
                                editarAction={this.editar}
                                alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Godfather I"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter}
                        modal={true}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        Confirma a exclusão deste naoconformidade?
                    </Dialog>
                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaNaoConformidade);
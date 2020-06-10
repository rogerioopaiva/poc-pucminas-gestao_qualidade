import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import DocumentosTable from './documentoTable'
import documentoService from '../../app/service/documentoService'
import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaDocumentos extends React.Component{

    state = {
        descricao: '',
        nomedocumento: '',
        classificacao: '',
        showConfirmDialog: false,
        documentoDeletar: {},
        documentos: []
    }

    constructor(){
        super();
        this.service = new documentoService();
    }

    buscar = () => {
        if(!this.state.ano){
            messages.mensagemErro('O preenchimento do campo Descrição é obrigatório.')
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const documentoFiltro = {
            ano: this.state.descricao,
            mes: this.state.nomedocumento,
            tipo: this.state.classificacao,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(documentoFiltro)
            .then( resposta => {
                const lista = resposta.data;
                if(lista.length < 1){
                    messages.mensagemAlerta("Nenhum resultado encontrado.")
                } 
                this.setState({ documentos: lista })
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-documentos/${id}`)
    }

    abrirConfirmacao = (documento) => {
        this.setState({showConfirmDialog : true, documentoDeletar: documento})
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, documentoDeletar: {}})
    }

    deletar = () => {
        this.service
            .deletar(this.state.documentoDeletar.id)
            .then(response => {
                const documentos = this.state.documentos;
                const index = documentos.indexOf(this.state.documentoDeletar)
                documentos.splice(index, 1);
                this.setState( {documentos, showConfirmDialog: false })
                messages.mensagemSucesso('Documento deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o documento.')
            })
    }

    prepararFormularioCadastro = () => {
        this.props.history.push('/cadastro-documentos')
    }

    alterarStatus = (documento, status) => {
        this.service
            .alterarStatus(documento.id, status)
            .then( response => {
            const documentos = this.state.documentos;
            const index = documentos.indexOf(documento);
            if(index !== -1){
                documento['status'] = status;
                documento[index] = documento
                this.setState({documento});
            }  
            messages.mensagemSucesso("Status atualizado com sucesso!")  
        })
    }

    render(){
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaDocumentos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={(this.deletar)} />
                <Button label="Cancelar" icon="pi pi-times" onClick={(this.cancelarDelecao)} 
                        className="p-button-secondary"/>
            </div>
        );

        return (
            <Card title="Consulta Documentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({descricao: e.target.value})}
                                    placeholder="Digite a Descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputNomeDocumento" label="Nome: ">
                                <SelectMenu id="inputNomeDocumento"
                                            value={this.state.nomedocumento}
                                            onChange={e => this.setState({ nomedocumento: e.target.value })}
                                            className="form-control" 
                                            lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputClass" label="Classificação: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputClass"
                                    value={this.state.classificacao}
                                    onChange={e => this.setState({classificacao: e.target.value})}
                                    placeholder="Digite a descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipoDocumentos" label="Tipo de Documentos: ">
                                <SelectMenu id="inputTipoDocumentos"
                                                value={this.state.tipo}
                                                onChange={e => this.setState({ tipo: e.target.value })}
                                                className="form-control" 
                                                lista={tipos} />
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
                <br/ >
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <DocumentosTable 
                            documentos={this.state.documentos} 
                            deleteAction={this.abrirConfirmacao}  
                            editarAction={this.editar} 
                            alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Godfather I" 
                            visible={this.state.showConfirmDialog} 
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter}
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão deste Documento?
                    </Dialog>
                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaDocumentos);
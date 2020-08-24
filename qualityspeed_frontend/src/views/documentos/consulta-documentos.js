import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import DocumentosTable from './documentoTable'
import documentoService from '../../app/service/documentoService'
import { Calendar } from 'primereact/calendar'
import { ptBr } from '../../app/service/dateConfig'
//import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaDocumentos extends React.Component {
  state = {
    //descricaoDocumento: '',
    nomeDocumento: "",
    classificacao: "",
    ultimarevisao: new Date("2020-06-09T00:00:00.000Z"),
    showConfirmDialog: false,
    documentoDeletar: {},
    documentos: [],
  };

  constructor() {
    super();
    this.service = new documentoService();
  }

  buscar = () => {
    if (!this.state.nomeDocumento) {
      messages.mensagemErro(
        "O preenchimento do campo Nome do documento é obrigatório."
      );
      return false;
    }

    const documentoFiltro = {
      nomeDocumento: this.state.nomeDocumento,
      classificacao: this.state.classificacao,
      ultimarevisao: new Date("2020-06-09T00:00:00.000Z"),
    };

    this.service
      .consultar(documentoFiltro)
      .then((resposta) => {
        const lista = resposta.data;
        if (lista.length < 1) {
          messages.mensagemAlerta("Nenhum resultado encontrado.");
        }
        this.setState({ documentos: lista });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editar = (id) => {
    this.props.history.push(`/cadastro-documentos/${id}`);
  };

  abrirConfirmacao = (documento) => {
    this.setState({ showConfirmDialog: true, documentoDeletar: documento });
  };

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, documentoDeletar: {} });
  };

  deletar = () => {
    this.service
      .deletar(this.state.documentoDeletar.id)
      .then((response) => {
        const documentos = this.state.documentos;
        const index = documentos.indexOf(this.state.documentoDeletar);
        documentos.splice(index, 1);
        this.setState({ documentos, showConfirmDialog: false });
        messages.mensagemSucesso("Documento deletado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu um erro ao tentar deletar o documento.");
      });
  };

  prepararFormularioCadastro = () => {
    this.props.history.push("/cadastro-documentos");
  };

  alterarStatus = (documento, status) => {
    this.service.alterarStatus(documento.id, status).then((response) => {
      const documentos = this.state.documentos;
      const index = documentos.indexOf(documento);
      if (index !== -1) {
        documento["status"] = status;
        documento[index] = documento;
        this.setState({ documento });
      }
      messages.mensagemSucesso("Status atualizado com sucesso!");
    });
  };

  render() {
    const confirmDialogFooter = (
      <div>
        <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelarDelecao}
          className="p-button-secondary"
        />
      </div>
    );

    return (
      <Card title="Consulta Documentos">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              {/* <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    value={this.state.descricaoDocumento}
                                    onChange={e => this.setState({descricaoDocumento: e.target.value})}
                                    placeholder="Digite a Descrição" />
                            </FormGroup> */}

              <FormGroup htmlFor="inputNomeDocumento" label="Nome do documento: *">
                <input
                  type="text"
                  className="form-control"
                  id="inputNomeDocumento"
                  value={this.state.nomeDocumento}
                  onChange={(e) =>
                    this.setState({ nomeDocumento: e.target.value })
                  }
                  placeholder="Digite o nome do documento"
                />
              </FormGroup>

              <FormGroup htmlFor="inputClass" label="Classificação: *">
                <input
                  type="text"
                  className="form-control"
                  id="inputClass"
                  value={this.state.classificacao}
                  onChange={(e) =>
                    this.setState({ classificacao: e.target.value })
                  }
                  placeholder="Digite a classificacao"
                />
              </FormGroup>

            <FormGroup id="inputUltimaRevisao" label="Última revisão: *">
                <div>
                    <Calendar
                        value={this.state.ultimarevisao}
                        onChange={(e) =>
                        this.setState({
                            ultimarevisao: e.value
                            .toLocaleDateString()
                            .replace(/\//g, "-"),
                        })
                        }
                        showIcon={true}
                        dateFormat="dd/mm/yy"
                        locale={ptBr}
                    />
                </div>
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
              <DocumentosTable
                documentos={this.state.documentos}
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
            Confirma a exclusão deste Documento?
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaDocumentos);
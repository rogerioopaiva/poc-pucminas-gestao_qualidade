import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import NaoConformidadeTable from './naoconformidadeTable'
import NaoConformidadeService from '../../app/service/naoConformidadeService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaNaoConformidade extends React.Component {
  state = {
    titulo: "",
    setor: "",
    showConfirmDialog: false,
    naoconformidadeDeletar: {},
    naoconformidades: [],
  };

  constructor() {
    super();
    this.service = new NaoConformidadeService();
  }

  buscar = () => {
    if (!this.state.titulo && !this.state.setor) {
      messages.mensagemErro(
        "O preenchimento de ao menos um campo é obrigatório."
      );
      return false;
    }

    const naoConformidadeFiltro = {
      titulo: this.state.titulo,
      setor: this.state.setor,
      acaocorretiva: this.state.acaocorretiva,
    };

    this.service
      .consultar(naoConformidadeFiltro)
      .then((resposta) => {
        const lista = resposta.data;
        if (lista.length < 1) {
          messages.mensagemAlerta("Nenhum resultado encontrado.");
        }
        this.setState({ naoconformidades: lista });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editar = (id) => {
    this.props.history.push(`/cadastro-naoconformidades/${id}`);
  };

  abrirConfirmacao = (naoconformidade) => {
    this.setState({
      showConfirmDialog: true,
      naoconformidadeDeletar: naoconformidade,
    });
  };

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, naoconformidadeDeletar: {} });
  };

  deletar = () => {
    this.service
      .deletar(this.state.naoconformidadeDeletar.id)
      .then((response) => {
        const naoconformidades = this.state.naoconformidades;
        const index = naoconformidades.indexOf(
          this.state.naoconformidadeDeletar
        );
        naoconformidades.splice(index, 1);
        this.setState({ naoconformidades, showConfirmDialog: false });
        messages.mensagemSucesso("Não conformidade deletado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(
          "Ocorreu um erro ao tentar deletar o naoconformidade."
        );
      });
  };

  prepararFormularioCadastro = () => {
    this.props.history.push("/cadastro-naoconformidades");
  };

  alterarStatus = (naoconformidade, status) => {
    this.service.alterarStatus(naoconformidade.id, status).then((response) => {
      const naoconformidades = this.state.naoconformidades;
      const index = naoconformidades.indexOf(naoconformidade);
      if (index !== -1) {
        naoconformidade["status"] = status;
        naoconformidade[index] = naoconformidade;
        this.setState({ naoconformidade });
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
      <Card title="Consulta Não Conformidade">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <FormGroup htmlFor="inputTitulo" label="Título: *">
                <input
                  type="text"
                  className="form-control"
                  id="inputTitulo"
                  value={this.state.titulo}
                  onChange={(e) => this.setState({ titulo: e.target.value })}
                  placeholder="Informe o título."
                />
              </FormGroup>
              <FormGroup htmlFor="inputSetor" label="Setor: *">
                <input
                  type="text"
                  className="form-control"
                  id="inputSetor"
                  value={this.state.setor}
                  onChange={(e) =>
                    this.setState({ setor: e.target.value })
                  }
                  placeholder="Informe a descrição."
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
              <NaoConformidadeTable
                naoconformidades={this.state.naoconformidades}
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
            Confirma a exclusão deste naoconformidade?
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaNaoConformidade);
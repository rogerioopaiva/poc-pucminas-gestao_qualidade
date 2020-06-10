import React from "react";
import * as messages from "../../components/toastr";

import Card from "../../components/card";
import { withRouter } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import naoConformidadeService from "../../app/service/naoConformidadeService";
import LocalSotrageService from "../../app/service/localstorageService";
import FormGroup from "../../components/form-group";
import naoConformidadeTable from "./naoConformidadeTable";

class ConsultaNaoConformidade extends React.Component {
  state = {
    descricao: "",
    setor: "",
    responsavel: "",
    causa: "",
    acaocorretiva: "",
    showConfirmDialog: false,
    naoConformidadeDeletar: {},
    naoConformidades: [],
  };

  constructor() {
    super();
    this.service = new naoConformidadeService();
  }

  buscar = () => {
    if (!this.state.ano) {
      messages.mensagemErro(
        "O preenchimento do campo Descrição é obrigatório."
      );
      return false;
    }
    const usuarioLogado = LocalSotrageService.obterItem("_usuario_logado");

    const naoConformidadeFiltro = {
      ano: this.state.descricao,
      mes: this.state.setor,
      tipo: this.state.classificacao,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id,
    };

    this.service
      .consultar(naoConformidadeFiltro)
      .then((resposta) => {
        const lista = resposta.data;
        if (lista.length < 1) {
          messages.mensagemAlerta("Nenhum resultado encontrado.");
        }
        this.setState({ naoConformidades: lista });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editar = (id) => {
    this.props.history.push(`/cadastro-naoConformidades/${id}`);
  };

  abrirConfirmacao = (naoConformidade) => {
    this.setState({ showConfirmDialog: true, naoConformidadeDeletar: naoConformidade });
  };

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, naoConformidadeDeletar: {} });
  };

  deletar = () => {
    this.service
      .deletar(this.state.naoConformidadeDeletar.id)
      .then((response) => {
        const naoConformidades = this.state.naoConformidades;
        const index = naoConformidades.indexOf(this.state.naoConformidadeDeletar);
        naoConformidades.splice(index, 1);
        this.setState({ naoConformidades, showConfirmDialog: false });
        messages.mensagemSucesso("Noão Conformidade deletada com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu um erro ao tentar deletar a não conformidade.");
      });
  };

  prepararFormularioCadastro = () => {
    this.props.history.push("/cadastro-naoconformidade");
  };

  alterarStatus = (naoConformidade, status) => {
    this.service.alterarStatus(naoConformidade.id, status).then((response) => {
      const naoConformidades = this.state.naoConformidades;
      const index = naoConformidades.indexOf(naoConformidade);
      if (index !== -1) {
        naoConformidade["status"] = status;
        naoConformidade[index] = naoConformidade;
        this.setState({ naoConformidade });
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
              <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                <input
                  type="text"
                  className="form-control"
                  id="inputDescricao"
                  value={this.state.descricao}
                  onChange={(e) => this.setState({ descricao: e.target.value })}
                  placeholder="Digite a Descrição"
                />
              </FormGroup>

              <FormGroup htmlFor="inputDescricao" label="Setor: *">
                <input
                  type="text"
                  className="form-control"
                  id="inputSetor"
                  value={this.state.setor}
                  onChange={(e) => this.setState({ setor: e.target.value })}
                  placeholder="Digite a Setor"
                />
              </FormGroup>

              <FormGroup htmlFor="inputClass" label="Ação Corretiva: *">
                <input
                  type="text"
                  className="form-control"
                  id="inputClass"
                  value={this.state.acaocorretiva}
                  onChange={(e) =>
                    this.setState({ acaocorretiva: e.target.value })
                  }
                  placeholder="Digite a ação corretiva"
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
              <naoConformidadeTable
                naoConformidades={this.state.naoConformidades}
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
            Confirma a exclusão desta não conformidade?
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaNaoConformidade);

import React from "react";

import Card from "../../components/card";

import { withRouter } from "react-router-dom";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import * as messages from "../../components/toastr";
import naoConformidadeService from "../../app/service/naoConformidadeService";
import LocalSotrageService from "../../app/service/localstorageService";

class CadastroNaoConformidade extends React.Component {
  state = {
    id: null,
    dataocorrencia: null,
    descricao: "",
    setor: "",
    responsavel: "",
    causa: "",
    acaocorretiva:"",
    status: "",
    prazoparaconclusao: null,
    usuario: null,
    atualizando: false,
  };

  constructor() {
    super();
    this.service = new naoConformidadeService();
  }

  componentDidMount() {
    const params = this.props.match.params;

    if (params.id) {
      this.service
        .obterPorId(params.id)
        .then((response) => {
          this.setState({ ...response.data, atualizando: true });
        })
        .catch((erros) => {
          messages.mensagemErro(erros.response.data);
        });
    }
  }

  submit = () => {
    const usuarioLogado = LocalSotrageService.obterItem("_usuario_logado");

    const { dataocorrencia, descricao, setor, responsavel, causa, acaocorretiva } = this.state;
    const naoconformidade = {
      dataocorrencia,  
      descricao,
      setor,
      responsavel,
      causa,
      acaocorretiva,
      usuario: usuarioLogado.id,
    };

    try {
      this.service.validar(naoconformidade);
    } catch (erro) {
      const mensagens = erro.mensagens;
      mensagens.forEach((msg) => messages.mensagemErro(msg));
      return false;
    }

    this.service
      .salvar(naoconformidade)
      .then((response) => {
        this.props.history.push("/consulta-naoconformidade");
        messages.mensagemSucesso("Não conformidade cadastrada com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  atualizar = () => {
    const {
      dataocorrencia,
      descricao,
      setor,
      causa,
      acaocorretiva,
      status,
      usuario,
      id,
    } = this.state;
    const naoconformidade = {
      dataocorrencia,
      descricao,
      setor,
      causa,
      acaocorretiva,
      status,
      usuario,
      id,
    };

    this.service
      .atualizar(naoconformidade)
      .then((response) => {
        this.props.history.push("/consulta-naoconformidade");
        messages.mensagemSucesso("Documento atualizado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {

    return (
      <Card
        title={
          this.state.atualizando
            ? "Atualização de nao conformidade"
            : "Cadastro de Não conformidade"
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
            <FormGroup id="inputSetor" label="Setor: *">
              <input
                id="inputAno"
                type="text"
                name="ano"
                value={this.state.ano}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-=md-6">
            <FormGroup id="inputCausa" label="Causa: *">
              <SelectMenu
                id="inputCausa"
                value={this.state.causa}
                onChange={this.handleChange}
                name="causa"
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id="inputAcaoCorretiva" label="Ação Corretiva: *">
              <SelectMenu
                id="inputAcaoCorretiva"
                name="acaoCorretiva"
                value={this.state.acaocorretiva}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="inputStatus" label="Status: *">
              <input
                type="text"
                className="form-control"
                name="status"
                value={this.state.status}
                disabled
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

export default withRouter(CadastroNaoConformidade);

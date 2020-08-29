import React from "react";

import Card from "../../components/card";

import { withRouter } from "react-router-dom";
import FormGroup from "../../components/form-group";
import * as messages from "../../components/toastr";
import SelectMenu from "../../components/selectMenu";
import SelectType from "../../components/selectType";
import planosAcaoService from "../../app/service/planosAcaoService";
import ColaboradorService from "../../app/service/colaboradorService";


class CadastroPlanosAcao extends React.Component {
  state = {
    id: null,
    comeco: "",
    termino: "",
    tipoacao: "",
    oque: "",
    porque: "",
    onde: "",
    como: "",
    quem: null,
    status: null,
    atualizando: false,
    lista: [],
  };

  constructor() {
    super();
    this.service = new planosAcaoService();
  }

  colaboradorService = new ColaboradorService();

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
    this.colaboradorService
      .obterPorResponsaveis()
      .then((response) => this.setState({ lista: response.data }));
  }

  submit = () => {
    const {
      comeco,
      termino,
      tipoacao,
      oque,
      porque,
      onde,
      como,
      quem,
    } = this.state;
    const planoacao = {
      comeco,
      termino,
      tipoacao,
      oque,
      porque,
      onde,
      como,
      quem,
    };
    try {
      this.service.validar(planoacao);
    } catch (erro) {
      const mensagens = erro.mensagens;
      mensagens.forEach((msg) => messages.mensagemErro(msg));
      return false;
    }

    this.service
      .salvar(planoacao)
      .then((response) => {
        this.props.history.push("/consulta-planosacao");
        messages.mensagemSucesso("Plano ação cadastrado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  atualizar = () => {
    const { comeco, termino, tipoacao, oque, porque, onde, como, quem, id } = this.state;
    const planoacao = { comeco, termino, tipoacao, oque, porque, onde, como, quem, id };

    this.service
      .atualizar(planoacao)
      .then((response) => {
        this.props.history.push("/consulta-planosacao");
        messages.mensagemSucesso("Plano de ação atualizado com sucesso!");
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
    const tipoacao = this.service.obterListaTipoAcao();

    return (
      <Card
        title={
          this.state.atualizando
            ? "Atualização de plano de ação"
            : "Cadastro de Plano de ação"
        }
      >
        <div className="row">
          <div className="col-md-2">
            <FormGroup id="inputComeco" label="Quando começa: *">
              <input
                id="inputComeco"
                type="text"
                className="form-control"
                name="comeco"
                value={this.state.comeco}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-2">
            <FormGroup id="inputTermino" label="Quando termina: *">
              <input
                id="inputTermino"
                type="text"
                className="form-control"
                name="termino"
                value={this.state.termino}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="selectTipoAcao" label="Tipo de ação: *">
              <SelectType
                lista={tipoacao}
                id="selectTipoAcao"
                name="tipoacao"
                value={this.state.tipoacao}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-12">
            <FormGroup id="inputOque" label="O que deve ser feito: *">
              <input
                id="inputOque"
                type="text"
                className="form-control"
                name="oque"
                value={this.state.oque}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-10">
            <FormGroup id="inputComo" label="Como fazer: *">
              <input
                id="inputComo"
                type="text"
                name="como"
                value={this.state.como}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputPorque" label="Porque: *">
              <input
                id="inputPorque"
                type="text"
                name="porque"
                value={this.state.porque}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputOnde" label="Onde: *">
              <input
                id="inputOnde"
                type="text"
                name="onde"
                value={this.state.onde}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="inputQuem" label="Quem? *">
              <SelectMenu
                lista={this.state.lista}
                id="inputQuem"
                name="quem"
                value={this.state.quem}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row"></div>
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
              onClick={(e) => this.props.history.push("/consulta-planosacao")}
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

export default withRouter(CadastroPlanosAcao);
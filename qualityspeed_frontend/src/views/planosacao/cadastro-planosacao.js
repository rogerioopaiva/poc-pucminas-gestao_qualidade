import React from "react";

import Card from "../../components/card";

import { Calendar } from "primereact/calendar";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/form-group";
import * as messages from "../../components/toastr";
import SelectMenu from "../../components/selectMenu";
import planosAcaoService from "../../app/service/planosAcaoService";
import { ptBr } from "../../app/service/dateConfig";

class CadastroPlanosAcao extends React.Component {
  state = {
    id: null,
    dataocorrencia: new Date("2020-06-09T00:00:00.000Z"),
    oque: "",
    porque: "",
    onde: "",
    quem: "",
    quando: new Date("2020-06-09T00:00:00.000Z"),
    como: "",
    quantocusta: "",
    termino: new Date("2020-06-09T00:00:00.000Z"),
    naoconformidade: "",
    responsavelacao: "",
    status: null,
    atualizando: false,
  };

  constructor() {
    super();
    this.service = new planosAcaoService();
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
    const {
      dataocorrencia,
      oque,
      porque,
      onde,
      quem,
      quando,
      como,
      quantocusta,
      termino,
      naoconformidade,
      responsavelacao
    } = this.state;
    const planoacao = {
      dataocorrencia,
      oque,
      porque,
      onde,
      quem,
      como,
      quando,
      quantocusta,
      termino,
      naoconformidade,
      responsavelacao
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
        this.props.history.push("/cadastro-planosacao");
        messages.mensagemSucesso("Plano ação cadastrado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  atualizar = () => {
    const { dataocorrencia, oque, porque, onde, quem, id } = this.state;
    const planoacao = { dataocorrencia, oque, porque, onde, quem, id };

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
    const lista = [{ label: "Selecione...", value: "" }];

    return (
      <Card
        title={
          this.state.atualizando
            ? "Atualização de plano de ação"
            : "Cadastro de Plano de ação"
        }
      >
        <div className="row">
          <div className="col-md-3">
            <FormGroup id="inputDataOcorrencia" label="Data ocorrência: *">
              <Calendar
                value={this.state.dataocorrencia}
                onChange={(e) =>
                  this.setState({
                    dataocorrencia: e.value
                      .toLocaleDateString()
                      .replace(/\//g, "-"),
                  })
                }
                showIcon={true}
                dateFormat="dd/mm/yy"
                locale={ptBr}
              />
            </FormGroup>
          </div>
          <div className="col-md-12">
            <FormGroup id="inputoque" label="O que ocorreu: *">
              <input
                id="inputoque"
                type="text"
                className="form-control"
                name="oque"
                value={this.state.oque}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputporque" label="Porque: *">
              <input
                id="inputAno"
                type="text"
                name="porque"
                value={this.state.porque}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputonde" label="Onde: *">
              <input
                id="inputAno"
                type="text"
                name="onde"
                value={this.state.onde}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputquem" label="Quem: *">
              <input
                id="inputQuem"
                type="text"
                name="quem"
                value={this.state.quem}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <FormGroup id="inputQuando" label="Quando começa: *">
              <Calendar
                value={this.state.quando}
                onChange={(e) =>
                  this.setState({
                    quando: e.value.toLocaleDateString().replace(/\//g, "-"),
                  })
                }
                showIcon={true}
                dateFormat="dd/mm/yy"
                locale={ptBr}
              />
            </FormGroup>
          </div>
          <div className="col-md-3">
            <FormGroup id="inputQuando" label="Quando termina: *">
              <Calendar
                value={this.state.termino}
                onChange={(e) =>
                  this.setState({
                    quando: e.value.toLocaleDateString().replace(/\//g, "-"),
                  })
                }
                showIcon={true}
                dateFormat="dd/mm/yy"
                locale={ptBr}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <FormGroup id="inputquando" label="Como aconteceu: *">
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
          <div className="col-md-4">
            <FormGroup id="inputquando" label="Quanto custa: *">
              <input
                id="inputQuantoCusta"
                type="text"
                name="quantoCusta"
                value={this.state.quantocusta}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup id="inputquem" label="Não conformidade: *">
              <SelectMenu
                lista={lista}
                id="inputNaoConformidade"
                name="naoconformidade"
                value={this.state.naoconformidade}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="inputquem" label="Responsável ação: *">
              <SelectMenu
                lista={lista}
                id="inputresponsavelacao"
                name="responsavelacao"
                value={this.state.responsavelacao}
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

export default withRouter(CadastroPlanosAcao);
import React from "react";

import Card from "../../components/card";

import { Calendar } from "primereact/calendar";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/form-group";
import * as messages from "../../components/toastr";
import planosAcaoService from "../../app/service/planosAcaoService";
import { ptBr } from "../../app/service/dateConfig";

class CadastroPlanosAcao extends React.Component {
    state = {
        id: null,
        dataocorrencia: null,
        oque: "",
        porque: "",
        onde: "",
        quem: "",
        quando: "",
        como: "",
        quantocusta: "",
        termino: null,
        novoprazo: null,
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

        const { dataocorrencia, oque, porque, onde, quem, quando, como, quantocusta, termino  } = this.state;
        const planoacao = {
            dataocorrencia,
            oque,
            porque,
            onde,
            quem,
            como,
            quando,
            quantocusta,
            termino
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
        const {
            dataocorrencia,
            oque,
            porque,
            onde,
            quem,
            id,
        } = this.state;
        const planoacao = {
            dataocorrencia,
            oque,
            porque,
            onde,
            quem,
            id,
        };

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

        return (
          <Card
            title={
              this.state.atualizando
                ? "Atualização de nao conformidade"
                : "Cadastro de Não conformidade"
            }
          >
            <div className="col-md-3">
              <FormGroup id="inputPrazoConclusao" label="Prazo Conclusão: *">
                <Calendar
                  value={this.state.prazoconclusao}
                  onChange={(e) => this.setState({ prazoconclusao: e.value })}
                  showIcon={true}
                  dateFormat="dd/mm/yy"
                  locale={ptBr}
                />
              </FormGroup>
            </div>
            <div className="row">
              <div className="col-md-12">
                <FormGroup id="inputoque" label="Descrição: *">
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
                <FormGroup id="inputporque" label="porque: *">
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
              {/* <div className="col-=md-6">
                        <FormGroup id="inputonde" label="onde: *">
                            <SelectMenu
                                id="inputonde"
                                value={this.state.onde}
                                onChange={this.handleChange}
                                name="onde"
                                className="form-control"
                            />
                        </FormGroup>
                    </div> */}
            </div>
            <div className="row">
              {/* <div className="col-md-4">
                        <FormGroup id="inputquem" label="Ação Corretiva: *">
                            <SelectMenu
                                id="inputquem"
                                name="quem"
                                value={this.state.quem}
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </FormGroup>
                    </div> */}
              <div className="col-md-4">
                <FormGroup id="inputquando" label="quando: *">
                  <input
                    type="text"
                    className="form-control"
                    name="quando"
                    value={this.state.quando}
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

export default withRouter(CadastroPlanosAcao);
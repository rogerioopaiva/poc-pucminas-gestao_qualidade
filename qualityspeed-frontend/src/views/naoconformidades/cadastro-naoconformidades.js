import React from 'react'

import Card from '../../components/card'

import { withRouter } from 'react-router-dom'
import FormGroup from '../../components/form-group'
import * as messages from '../../components/toastr'
import ColaboradorService from "../../app/service/colaboradorService";
import NaoConformidadeService from '../../app/service/naoConformidadeService'

class CadastroNaoConformidade extends React.Component {
  state = {
    id: null,
    dataocorrencia: "",
    titulo: "",
    setor: "",
    causa: "",
    acaocorretiva: "",
    status: "",
    usuario: null,
    atualizando: false,
    lista: [],
  };

  constructor() {
    super();
    this.service = new NaoConformidadeService();
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
      dataocorrencia,
      titulo,
      setor,
      //id_colaboradorcorretiva,
      causa,
      acaocorretiva,
      prazoconclusao,
    } = this.state;
    const naoconformidades = {
      dataocorrencia,
      titulo,
      setor,
      //id_colaboradorcorretiva,
      causa,
      acaocorretiva,
      prazoconclusao,
    };

    try {
      this.service.validar(naoconformidades);
    } catch (erro) {
      const mensagens = erro.mensagens;
      mensagens.forEach((msg) => messages.mensagemErro(msg));
      return false;
    }

    this.service
      .salvar(naoconformidades)
      .then((response) => {
        this.props.history.push("/consulta-naoconformidades");
        messages.mensagemSucesso("Não conformidade cadastrado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  atualizar = () => {
    const { titulo, setor, causa, status, id } = this.state;
    const naoconformidade = { titulo, setor, causa, status, id };

    this.service
      .atualizar(naoconformidade)
      .then((response) => {
        this.props.history.push("/consulta-naoconformidades");
        messages.mensagemSucesso("Não conformidade atualizada com sucesso!");
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
            ? "Atualização de não conformidade"
            : "Cadastro de não conformidade"
        }
      >
        <div className="row">
          <div className="col-md-2">
            <FormGroup id="inputDataOcorrencia" label="Data da Ocorrência: *">
              <input
                id="inputDataOcorrencia"
                type="text"
                className="form-control"
                name="dataocorrencia"
                value={this.state.dataocorrencia}
                onChange={this.handleChange}
              />
              {/* <Calendar
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
              /> */}
            </FormGroup>
          </div>
          {/* <div className="col-md-3">
            <FormGroup id="inputPrazoConclusao" label="Prazo para Conclusão: *">
              <Calendar
                value={this.state.prazoconclusao}
                onChange={(e) =>
                  this.setState({
                    prazoconclusao: e.value
                      .toLocaleDateString()
                      .replace(/\//g, "-"),
                  })
                }
                showIcon={true}
                dateFormat="dd/mm/yy"
                locale={ptBr}
              />
            </FormGroup>
          </div> */}
        </div>
        <div className="row">
          <div className="col-md-8">
            <FormGroup id="inputTitulo" label="Título: *">
              <input
                id="inputTitulo"
                type="text"
                className="form-control"
                name="titulo"
                value={this.state.titulo}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <FormGroup id="inputSetor" label="Setor: *">
              <input
                id="inputSetor"
                type="text"
                className="form-control"
                name="setor"
                value={this.state.setor}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-4">
            <FormGroup
              id="inputid_colaboradorcorretiva"
              label="Responsável corretiva: *"
            >
              <SelectMenu
                lista={this.state.lista}
                id="inputnomeresponsavel"
                name="id_colaboradorcorretiva"
                value={this.state.id_colaboradorcorretiva}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-8">
            <FormGroup id="inputCausa" label="Causa: *">
              <textarea
                id="inputCausa"
                type="text"
                className="form-control"
                name="causa"
                value={this.state.causa}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputAcaoCorretiva" label="Ação corretiva: *">
              <input
                id="inputAcaoCorretiva"
                type="text"
                className="form-control"
                name="acaocorretiva"
                value={this.state.acaocorretiva}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div> */}
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
              onClick={(e) =>
                this.props.history.push("/consulta-naoconformidades")
              }
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
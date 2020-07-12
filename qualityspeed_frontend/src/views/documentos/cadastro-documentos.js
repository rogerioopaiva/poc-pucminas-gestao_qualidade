import React from 'react'

import Card from '../../components/card'

import { Calendar } from 'primereact/calendar';
import { withRouter } from 'react-router-dom'
import FormGroup from '../../components/form-group'
import * as messages from '../../components/toastr'
import DocumentoService from '../../app/service/documentoService'
import ColaboradorService from "../../app/service/colaboradorService";
import SelectMenu from "../../components/selectMenu";
import { ptBr } from '../../app/service/dateConfig'

class CadastroDocumentos extends React.Component {
  state = {
    id: null,
    descricao: "",
    nomedocumento: "",
    classificacao: "",
    id_colaborador: "",
    ultimarevisao: new Date("2020-06-09T00:00:00.000Z"),
    proximarevisao: new Date("2020-06-09T00:00:00.000Z"),
    status: "",
    usuario: null,
    atualizando: false,
    lista: [],
    itemSelecionado: {},
  };

  constructor() {
    super();
    this.service = new DocumentoService();
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
    this.colaboradorService.obterPorResponsaveis()
      .then((response) => this.setState({ lista: response.data }));
  }

  submit = () => {
    const {
      descricao,
      nomedocumento,
      classificacao,
      id_colaborador,
      ultimarevisao,
      proximarevisao,
    } = this.state;
    const documento = {
      descricao,
      nomedocumento,
      classificacao,
      id_colaborador,
      ultimarevisao,
      proximarevisao,
    };

    try {
      this.service.validar(documento);
    } catch (erro) {
      const mensagens = erro.mensagens;
      mensagens.forEach((msg) => messages.mensagemErro(msg));
      return false;
    }

    this.service
      .salvar(documento)
      .then((response) => {
        this.props.history.push("/cadastro-documentos");
        messages.mensagemSucesso("Documento cadastrado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  atualizar = () => {
    const {
      descricao,
      nomedocumento,
      classificacao,
      revisoes,
      usuario,
      status,
      id,
    } = this.state;
    const documento = {
      descricao,
      nomedocumento,
      classificacao,
      revisoes,
      usuario,
      status,
      id,
    };

    this.service
      .atualizar(documento)
      .then((response) => {
        this.props.history.push("/consulta-documentos");
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
    // this.colaboradorService
    //   .obterPorResponsaveis
    //   .then((resposta) => {
    //     debugger;
    //     const lista2 = resposta.data;
    //     for (var i = 0; i < lista2.length; i++) {
    //       var obj = lista2[i];
    //       console.log(obj.id);
    //     }
    //     this.setState({ atualizando: true })
    //   })
    //   .catch((erros) => {
    //     messages.mensagemErro(erros.response.data);
    //   });
    // let lista2 = colaboradorService.obterPorResponsaveis();

    // const lista = [
    //   { label: "Selecione...", value: "" },
    //   { label: "Cabral Couto", value: 4 },
    //   { label: "José Couto", value: 5 },
    // ];

    return (
      <Card
        title={
          this.state.atualizando
            ? "Atualização de documento"
            : "Cadastro de Documento"
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
            <FormGroup id="inputNomeDocumento" label="Nome do documento: *">
              <input
                id="inputNomeDocumento"
                type="text"
                name="nomedocumento"
                value={this.state.nomedocumento}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputClassificacao" label="Classificação: *">
              <input
                id="inputClassificacao"
                type="text"
                name="classificacao"
                value={this.state.classificacao}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputResponsavel" label=" Nome do Responsável: *">
              <SelectMenu
                lista={this.state.lista}
                id="inputnomeresponsavel"
                name="nomeresponsavel"
                value={this.state.itemSelecionado}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          {/* <div className="col-md-6">
            <FormGroup id="inputResponsavel" label=" Nome do Responsável: *">
              <SelectMenu
                lista={lista}
                id="inputnomeresponsavel"
                name="nomeresponsavel"
                value={this.state.lista}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div> */}
          <div className="col-md-3">
            <FormGroup id="inputUltimaRevisao" label="Última revisão: *">
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
            </FormGroup>
          </div>
          <div className="col-md-3">
            <FormGroup id="inputProximaRevisao" label="Próxima revisão: *">
              <Calendar
                value={this.state.proximarevisao}
                onChange={(e) =>
                  this.setState({
                    proximarevisao: e.value
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

export default withRouter(CadastroDocumentos);
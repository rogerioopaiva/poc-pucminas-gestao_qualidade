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
    id_colaborador: {},
    ultimarevisao: new Date("dd-MM-YYYY"),
    proxrevisao: new Date("dd-MM-YYYY"),
    status: "",
    usuario: null,
    atualizando: false,
    lista: [],
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
    this.colaboradorService
      .obterPorResponsaveis()
      .then((response) => this.setState({ lista: response.data }));
  }

  submit = () => {
    const {
      descricao,
      nomedocumento,
      classificacao,
      id_colaborador,
      ultimarevisao,
      proxrevisao,
    } = this.state;
    const documento = {
      descricao,
      nomedocumento,
      classificacao,
      id_colaborador,
      ultimarevisao,
      proxrevisao,
    };
    debugger
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
        this.props.history.push("/consulta-documentos");
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
      id_colaborador,
      ultimarevisao,
      proxrevisao,
      status,
      id,
    } = this.state;
    const documento = {
      descricao,
      nomedocumento,
      classificacao,
      id_colaborador,
      ultimarevisao,
      proxrevisao,
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
            <FormGroup id="inputDescricao" label="Descrição do documento: *">
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
                id="inputResponsavel"
                name="id_colaborador"
                value={this.state.id_colaborador}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
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
            <FormGroup id="inputProxRevisao" label="Próxima revisão: *">
              <Calendar
                value={this.state.proxrevisao}
                onChange={(e) =>
                  this.setState({
                    proxrevisao: e.value
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
              onClick={(e) => this.props.history.push("/consulta-documentos")}
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
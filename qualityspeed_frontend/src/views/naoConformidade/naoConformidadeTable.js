import React from "react";
import currencyFormatter from "currency-formatter";

export default (props) => {
  const rows = props.naoConformidades.map((naoConformidade) => {
    return (
      <tr key={naoConformidade.id}>
        <td>{naoConformidade.descricao}</td>
        <td>{naoConformidade.setor}</td>
        <td>{naoConformidade.causa}</td>
        <td>{naoConformidade.acaocorretiva}</td>
        <td>
          <button
            className="btn btn-secondary btn-lg"
            title="Efetivar"
            disabled={naoConformidade.status !== "PENDENTE"}
            onClick={(e) => props.alterarStatus(naoConformidade, "EM ANÁLISE")}
            type="button"
          >
            <i className="pi pi-check"></i>
          </button>
          <button
            className="btn btn-success"
            title="Cancelar"
            disabled={naoConformidade.status !== "EM ANÁLISE"}
            onClick={(e) => props.alterarStatus(naoConformidade, "FINALIZADO")}
            type="button"
          >
            <i className="pi pi-times"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            title="Editar"
            onClick={(e) => props.editarAction(naoConformidade.id)}
          >
            <i className="pi pi-pencil"></i>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            title="Excluir"
            onClick={(e) => props.deleteAction(naoConformidade)}
          >
            <i className="pi pi-trash"></i>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Setor</th>
          <th scope="col">Ação Corretiva</th>
          <th scope="col">Data</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

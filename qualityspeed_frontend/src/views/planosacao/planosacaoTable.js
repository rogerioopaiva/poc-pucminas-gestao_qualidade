import React from "react";

export default (props) => {
    const rows = props.planoacoes.map((planosacao) => {
        return (
          <tr key={planosacao.id}>
            <td>{planosacao.oque}</td>
            <td>{planosacao.porque}</td>
            <td>{planosacao.onde}</td>
            <td>{planosacao.colaborador.nomecolaborador}</td>
            <td>{planosacao.status}</td>
            <td>
              <button
                className="btn btn-warning"
                title="Efetivar"
                disabled={planosacao.status !== "PENDENTE"}
                onClick={(e) => props.alterarStatus(planosacao, "EMANDAMENTO")}
                type="button"
              >
                <i className="pi pi-bell"></i>
              </button>
              <button
                className="btn btn-success"
                title="Cancelar"
                disabled={planosacao.status !== "EMANDAMENTO"}
                onClick={(e) => props.alterarStatus(planosacao, "FINALIZADO")}
                type="button"
              >
                <i className="pi pi-check"></i>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                title="Editar"
                disabled={planosacao.status === "FINALIZADO"}
                onClick={(e) => props.editarAction(planosacao.id)}
              >
                <i className="pi pi-pencil"></i>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                title="Excluir"
                onClick={(e) => props.deleteAction(planosacao)}
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
                    <th scope="col">O que</th>
                    <th scope="col">Porque</th>
                    <th scope="col">Onde</th>
                    <th scope="col">Quem</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};
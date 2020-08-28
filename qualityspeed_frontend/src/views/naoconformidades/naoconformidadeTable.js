import React from 'react'

export default props => {

    const rows = props.naoconformidades.map(naoconformidade => {
        return (
          <tr key={naoconformidade.id}>
            <td>{naoconformidade.titulo}</td>
            <td>{naoconformidade.setor}</td>
            <td>{naoconformidade.causa}</td>
            <td>{naoconformidade.status}</td>
            <td>
              <button
                className="btn btn-warning"
                title="Efetivar"
                disabled={naoconformidade.status !== "PENDENTE"}
                onClick={(e) =>
                  props.alterarStatus(naoconformidade, "EMANALISE")
                }
                type="button"
              >
                <i className="pi pi-bell"></i>
              </button>
              <button
                className="btn btn-success"
                title="Finalizar"
                disabled={naoconformidade.status !== "EMANALISE"}
                onClick={(e) =>
                  props.alterarStatus(naoconformidade, "FINALIZADO")
                }
                type="button"
              >
                <i className="pi pi pi-check"></i>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                title="Editar"
                disabled={naoconformidade.status === "FINALIZADO"}
                onClick={(e) => props.editarAction(naoconformidade.id)}
              >
                <i className="pi pi-pencil"></i>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                title="Excluir"
                onClick={(e) => props.deleteAction(naoconformidade)}
              >
                <i className="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        );
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Título</th>
                    <th scope="col">Setor</th>
                    <th scope="col">Causa</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}
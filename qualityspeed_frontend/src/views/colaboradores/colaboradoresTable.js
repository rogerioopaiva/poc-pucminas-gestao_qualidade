import React from 'react'

export default props => {

    const rows = props.colaboradores.map( colaborador => {
        return (
            <tr key={colaborador.id}>
            <td>{colaborador.nomecolaborador}</td>
                <td>{colaborador.setor}</td>
                <td>{colaborador.cargo}</td>
                <td>{colaborador.dataadmissao}</td>
                <td>
                    <button type="button" 
                            className="btn btn-primary" title="Editar"
                            onClick={e => props.editarAction(colaborador.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" 
                            className="btn btn-danger" title="Excluir"
                            onClick={ e => props.deleteAction(colaborador)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Nome colaborador</th>
            <th scope="col">Setor</th>
            <th scope="col">Cargo</th>
            <th scope="col">Data admissão</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
}
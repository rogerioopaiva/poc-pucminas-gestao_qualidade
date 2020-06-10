import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.colaboradores.map( colaborador => {
        return (
            <tr key={colaborador.id}>
                <td>{colaborador.nome}</td>
                <td>{ currencyFormatter.format(colaborador.valor, { locale: 'pt-BR'})}</td>
                <td>{colaborador.setor}</td>
                <td>{colaborador.cargo}</td>
                <td>{colaborador.status}</td>
                <td>
                    <button className="btn btn-success" title="Efetivar"
                            disabled={ colaborador.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(colaborador, 'EFETIVADO')}
                            type="button">
                            <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning" title="Cancelar"
                            disabled={ colaborador.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(colaborador, 'CANCELADO')}
                            type="button">
                            <i className="pi pi-times"></i>
                    </button>
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
            <th scope="col">Situação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
}
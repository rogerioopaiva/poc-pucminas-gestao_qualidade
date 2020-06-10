import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.documentos.map( documento => {
        return (
            <tr key={documento.id}>
                <td>{documento.descricao}</td>
                <td>{ currencyFormatter.format(documento.valor, { locale: 'pt-BR'})}</td>
                <td>{documento.tipo}</td>
                <td>{documento.mes}</td>
                <td>{documento.status}</td>
                <td>
                    <button className="btn btn-success" title="Efetivar"
                            disabled={ documento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(documento, 'EFETIVADO')}
                            type="button">
                            <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning" title="Cancelar"
                            disabled={ documento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(documento, 'CANCELADO')}
                            type="button">
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button" 
                            className="btn btn-primary" title="Editar"
                            onClick={e => props.editarAction(documento.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" 
                            className="btn btn-danger" title="Excluir"
                            onClick={ e => props.deleteAction(documento)}>
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
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Data</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
        <tbody>
            {rows}
        </tbody>
        </table>
    );
}
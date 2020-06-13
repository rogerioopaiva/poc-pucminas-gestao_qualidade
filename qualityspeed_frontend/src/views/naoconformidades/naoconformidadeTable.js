import React from 'react'

export default props => {

    const rows = props.naoconformidades.map(naoconformidade => {
        return (
            <tr key={naoconformidade.id}>
                <td>{naoconformidade.descricao}</td>
                <td>{naoconformidade.setor}</td>
                <td>{naoconformidade.acaocorretiva}</td>
                <td>{naoconformidade.status}</td>
                <td>
                    <button className="btn btn-success" title="Efetivar"
                        disabled={naoconformidade.status !== 'PENDENTE'}
                        onClick={e => props.alterarStatus(naoconformidade, 'EFETIVADO')}
                        type="button">
                        <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning" title="Cancelar"
                        disabled={naoconformidade.status !== 'PENDENTE'}
                        onClick={e => props.alterarStatus(naoconformidade, 'CANCELADO')}
                        type="button">
                        <i className="pi pi-times"></i>
                    </button>
                    <button type="button"
                        className="btn btn-primary" title="Editar"
                        onClick={e => props.editarAction(naoconformidade.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"
                        className="btn btn-danger" title="Excluir"
                        onClick={e => props.deleteAction(naoconformidade)}>
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
                    <th scope="col">Setor</th>
                    <th scope="col">Ação Corretiva</th>
                    <th scope="col">Responsável Corretiva</th>
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
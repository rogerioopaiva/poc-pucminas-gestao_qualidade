import React from 'react'

export default props => {

    const rows = props.documentos.map( documento => {
        return (
            <tr key={documento.id}>
                <td>{documento.descricao}</td>
                <td>{documento.nomedocumento}</td>
                <td>{documento.classificacao}</td>
                <td>{documento.ultimarevisao}</td>
                <td>{documento.status}</td>
                <td>
                    <button className="btn btn-success" title="Aprovar"
                            disabled={ documento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(documento, 'APROVADO')}
                            type="button">
                            <i className="pi pi-check"></i>
                    </button>
                    <button type="button" 
                            className="btn btn-primary" title="Editar"
                            disabled={ documento.status === 'APROVADO'}
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
            <th scope="col">Nome do documento</th>
            <th scope="col">Classificação</th>
            <th scope="col">Última Revisão</th>
            <th scope="col">Responsável documento</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
}
import React from 'react'

export default (props) => {

    const options = props.lista.map( (option, item) => {
        return (
          <option key={item.id} value={item.valor}>
            {option.nomecolaborador}
          </option>
        );
    })

    return (    
        <select {...props} >
            {options}
        </select>
    )
}
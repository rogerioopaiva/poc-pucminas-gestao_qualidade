import React from 'react'

export default (props) => {

    const options = props.lista.map( (option, item) => {
        return (
          <option key={item} value={option.id}>
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
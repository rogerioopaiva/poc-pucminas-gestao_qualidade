import React from 'react'

export default (props) => {

    const options = props.lista.map( (option, item) => {
      var selected = props.value === option.id ? true : false;
        return (
          <option key={item} value={option.id} selected={selected}>
            {option.nomecolaborador}
          </option>
        );
    })

    return (
      <select {...props} className="form-control">
        {options} 
      </select>
    );
    
}
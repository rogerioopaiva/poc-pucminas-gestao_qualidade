import React from "react";

export default (props) => {
  const options = props.lista.map((option, item) => {
    return (
      <option key={item} value={option.value}>
        {option.label}
      </option>
    );
  });

  return (
  <select {...props}>
    {options}
  </select>
  )
};
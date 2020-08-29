import React from "react";

export default (props) => {

  const options = props.lista.map((option, item) => {
    var selected = props.value === option.value ? true : false;
    return (
      <option key={item} value={option.id} selected={selected}>
        {option.label}
      </option>
    );
  });

  return (
    <select {...props} className="form-control">
      {options}
    </select>
  );
};
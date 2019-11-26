import React from "react";

export default ({ name, value, onChange, ...restProps }) => {
  return (
    <input
      className="add-panel__input"
      type="text"
      name={name}
      placeholder={`Enter ${name}...`}
      value={value === 0 ? "" : value}
      onChange={onChange}
      {...restProps}
    />
  );
};

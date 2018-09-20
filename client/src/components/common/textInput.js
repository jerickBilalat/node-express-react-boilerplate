import React from "react";

const TextInput = ({ label, name, onChange, placeholder, value, error }) => (
  <div>
    <input
      type="text"
      name={name}
      label={label}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
    {error && <div>{error}</div>}
  </div>
);

export default TextInput;

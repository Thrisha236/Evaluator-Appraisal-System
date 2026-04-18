import React from "react";

function InputField({ label, value, onChange, min, max }) {
  return (
    <div className="marks-input-row">
      <label>{label}</label>
      <input
        className="marks-input"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        placeholder="–"
      />
    </div>
  );
}

export default InputField;
import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  useEffect(() => {
    document.body.addEventListener(
      "click",
      (event) => {
        if (ref.current.contains(event.target)) {
          return;
        }
        setOpen(false);
      },
      { capture: true }
    );
  }, []);

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          className={`ui selection dropdown ${open && "visible active"}`}
          onClick={() => setOpen(!open)}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open && "visible transition"}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

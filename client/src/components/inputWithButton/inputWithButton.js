import React, { useState } from "react";
import "./inputWithButton.scss";

function InputWithButton(props) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(value);
  };

  const handleOnChange = e => {
    setValue(e.target.value);
    if (props.handleOnChange) {
      props.handleOnChange(e);
    }
  }

  return (
    <div className="textbar-with-button-container">
      <form submit={handleSubmit}>
        <input
          className="textbar-with-button-input"
          type="text"
          value={value}
          placeholder="Search ingredients..."
          onChange={e => handleOnChange(e)}
        />
        <input className="textbar-with-button-button" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default InputWithButton;

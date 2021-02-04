import React, { useState } from "react";
import styles from "./inputWithButton.module.scss";
import { RiSearch2Line } from "react-icons/ri";

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
    <div className={styles.wrapper}>
        <input
          className={styles.input}
          type="text"
          value={value}
          placeholder="Search ingredients..."
          onChange={e => handleOnChange(e)}
        />
        <div className={styles.button}><RiSearch2Line /></div>
    </div>
  );
}

export default InputWithButton;

import React, { useState } from "react";
import styles from "./suggestionSearch.module.scss";
import { RiSearch2Line } from "react-icons/ri";

function SuggestionSearch(props) {
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
      <RiSearch2Line />
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder="Search ingredients..."
        onChange={e => handleOnChange(e)}
      />
    </div>
  );
}

export default SuggestionSearch;

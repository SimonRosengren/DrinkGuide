import React, { useState } from "react";
import styles from "./ingredientCard.module.scss";

function IngredientCard(props) {
    const [isActive, setIsActive] = useState(false);
  const dismiss = () => {
    props.unmountMe();
  };

  const handleOnClick = (e) => {
    setIsActive(!isActive);
    if (props.handleOnClick) {
      props.handleOnClick(e);
    }
  };

  return (
    <div className={styles.card} onClick={(e) => handleOnClick(e)}>
      <p>{props.title}</p>
      {props.unmountMe ? <p onClick={dismiss}>x</p> : null}
    </div>
  );
}

export default IngredientCard;

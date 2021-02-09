import React, { useState } from "react";
import styles from "./ingredientCard.module.scss";

function IngredientCard(props) {
  const [isActive, setIsActive] = useState(false);
  const dismiss = () => {
    props.unmountMe();
  };

  const handleOnClick = () => {
    setIsActive(!isActive);
    if (props.handleOnClick) {
      props.handleOnClick(props.id);
    }
  };

  const className = !props.unmountMe ? styles.button : styles.split;

  return (
    <div className={styles.wrapper}>
      <button className={className} onClick={(e) => handleOnClick()}>
        {props.title}
      </button>
      {props.unmountMe ? (
        <button className={styles.dismissButton} onClick={dismiss}>
          x
        </button>
      ) : null}
    </div>
  );
}

export default IngredientCard;

import React, { useState } from "react";
import styles from "./ingredientCard.module.scss";
import { FiXCircle } from "react-icons/fi";

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
      <div className={className} onClick={(e) => handleOnClick()}>
        {props.title}
      </div>
      {props.unmountMe ? (
        <div className={styles.dismissButton} onClick={dismiss}>
          <FiXCircle className='mb-1'/>
        </div>
      ) : null}
    </div>
  );
}

export default IngredientCard;

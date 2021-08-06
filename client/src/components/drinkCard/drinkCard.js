import React, { useState, useEffect } from "react";
import styles from "./drinkCard.module.scss";
import { useHistory } from "react-router-dom";
function DrinkCard(props) {
  const history = useHistory();
  const handleClick = () => {
      history.push(`/drink/${props.uuid}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{props.drinkName}</h2>
        <p className={styles.description}>{props.drinkDescription}</p>
      </div>
      <button onClick={handleClick}>hejsan</button>
    </div>
  );
}

export default DrinkCard;

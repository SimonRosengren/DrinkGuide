import React, { useState, useEffect } from "react";
import styles from "./drinkCard.module.scss";

function DrinkCard(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{props.drinkName}</h2>
        <p className={styles.description}>{props.drinkDescription}</p>
      </div>
    </div>
  );
}

export default DrinkCard;

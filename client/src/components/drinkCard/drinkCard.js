import React, { useState, useEffect } from "react";
import styles from "./drinkCard.module.scss";

function DrinkCard(props) {
  return (
    <div class={styles.wrapper}>
      <h2 className={styles.title}>{props.drinkName}</h2>
      <div>
        <img
          className={styles.imageWrapper}
          src={props.image}
          alt={props.name}
        />
      </div>
      <p className={styles.description}>{props.drinkDescription}</p>
    </div>
  );
}

export default DrinkCard;

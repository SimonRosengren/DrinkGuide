import React, { useState, useEffect } from "react";
import styles from "./drinkCard.module.scss";
import { useHistory } from "react-router-dom";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import Downvote from '../vote/downvote'

function DrinkCard(props) {
  const history = useHistory();
  const handleClick = () => {
      history.push(`/drink/${props.uuid}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img src={props.image} alt={props.name} onClick={handleClick} />
      </div>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{props.drinkName}</h2>
        <p className={styles.description}>{props.drinkDescription}</p>
        <h4><Downvote id={props.uuid} active={false} /> 0 <BiDownvote /></h4>
      </div>
    </div>
  );
}

export default DrinkCard;

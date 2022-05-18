import React, { useState, useEffect } from "react";
import styles from "./drinkCard.module.scss";
import { useHistory } from "react-router-dom";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import Downvote from '../vote/downvote'
import Upvote from '../vote/upvote'

function DrinkCard(props) {
  const history = useHistory();
  const [tempScore, setTempScore] = useState(props.drink.score)

  const handleClick = () => {
    history.push(`/drink/${props.drink._id}`)
  }
  const handleUpvote = () => {
    setTempScore(tempScore + 1)
  }
  const handleDownvote = () => {
    setTempScore(tempScore - 1)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img src={props.drink.image.results[0].urls.regular} alt={props.drink.name} onClick={handleClick} />
      </div>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{props.drink.name}</h2>
        <p className={styles.description}>{props.drink.description}</p>
        <div className={styles.votingContainer}>
          <Upvote id={props.drink._id} active={props.likedDrinks.includes(props.drink._id)} handleUpvoteForParent={handleUpvote} />
          {tempScore}
          <Downvote id={props.drink._id} active={props.dislikedDrinks.includes(props.drink._id)} handleDownvoteForParent={handleDownvote} />
        </div>
      </div>
    </div>
  );
}

export default DrinkCard;

import React from "react";
import styles from "./ingredientSuggestionCard.module.scss";

function IngredientSuggestionCard({ key, text, handleIngredientsInput }) {
  return (
    <li key={key}>
      <div className={styles.wrapper} onClick={handleIngredientsInput}>{text}</div>
    </li>
  );
}

export default IngredientSuggestionCard;

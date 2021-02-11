import React, { useState } from "react";
import styles from "./ingredientPicker.module.scss";
import InputWithButton from "../../components/inputWithButton/inputWithButton";
import IngredientCard from "../../components/ingredientCard/ingredientCard";
import { BiDrink } from "react-icons/bi";
import { useHistory } from "react-router-dom";

function IngredientPicker(props) {
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const history = useHistory();

  const handleFindDrinks = () => {
    history.push("/browse")
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftColumn}>
        <h3>Suggestions</h3>
        <div className={styles.leftWrapper}>
          {suggestedIngredients.map((i, index) => {
            return (
              <IngredientCard
                key={index}
                title={i.name}
                id={index}
                handleOnClick={async (id) => {
                  const clickedIngredient = suggestedIngredients[id];
                  let temp = [];
                  for (const ingredient of props.pickedIngredients) {
                    temp.push(ingredient);
                  }
                  temp.push(clickedIngredient);
                  props.setPickedIngredients(temp);
                }}
              />
            );
          })}
        </div>
      </div>

      <InputWithButton
        handleOnChange={async (e) => {
          if (e.target.value) {
            let result = await (
              await fetch(`/api/ingredient/suggest?phrase=${e.target.value}`)
            ).json();
            setSuggestedIngredients(result);
          } else {
            setSuggestedIngredients([]);
          }
        }}
      />

      <div className={styles.rightColumn}>
        <h3>Your bar</h3>
        <div className={styles.rightWrapper}>
          {props.pickedIngredients.map((i, index) => {
            return (
              <IngredientCard
                key={index}
                title={i.name}
                unmountMe={() => {
                  let temp = [];
                  for (const ingredient of props.pickedIngredients) {
                    temp.push(ingredient);
                  }
                  temp.splice(index, 1);
                  props.setPickedIngredients(temp);
                }}
              />
            );
          })}
        </div>
      </div>
      <button className={styles.nextButton} onClick={handleFindDrinks}>
        Find drinks <BiDrink className={styles.icon} />
      </button>
    </div>
  );
}

export default IngredientPicker;
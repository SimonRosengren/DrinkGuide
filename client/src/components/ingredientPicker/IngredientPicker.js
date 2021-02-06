import React, { useState } from "react";
import styles from "./ingredientPicker.module.scss";
import InputWithButton from "../inputWithButton/inputWithButton";
import IngredientCard from "../ingredientCard/ingredientCard";
import { BiDrink } from "react-icons/bi";

function IngredientPicker(props) {
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const [pickedIngredients, setPickedIngredients] = useState([]);

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
                handleOnClick={async (e) => {
                  const clickedIngredient = suggestedIngredients.find(
                    (i) => i.name === e.target.innerHTML
                  );

                  let temp = [];
                  for (const ingredient of pickedIngredients) {
                    temp.push(ingredient);
                  }
                  temp.push(clickedIngredient);
                  setPickedIngredients(temp);
                  console.log("wtf");
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
              await fetch(
                `/api/ingredient/suggest?phrase=${e.target.value}`
              )
            ).json();
            // let result = [
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            //   { name: "test" },
            // ];
            setSuggestedIngredients(result);
          } else {
            setSuggestedIngredients([]);
          }
        }}
      />

      <div className={styles.rightColumn}>
        <h3>Your bar</h3>
        <div className={styles.rightWrapper}>
          {pickedIngredients.map((i, index) => {
            return (
              <IngredientCard
                key={index}
                title={i.name}
                unmountMe={() => {
                  let temp = [];
                  for (const ingredient of pickedIngredients) {
                    temp.push(ingredient);
                  }
                  temp.splice(index, 1);
                  setPickedIngredients(temp);
                }}
              />
            );
          })}
        </div>
      </div>
      <button className={styles.nextButton}>Find drinks < BiDrink className={styles.icon} /></button>
    </div>
  );
}

export default IngredientPicker;

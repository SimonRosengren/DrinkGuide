import React, { useState } from "react";
import "./ingredientPicker.scss";
import InputWithButton from "../inputWithButton/inputWithButton";
import IngredientCard from "../ingredientCard/ingredientCard";

function IngredientPicker(props) {
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const [pickedIngredients, setPickedIngredients] = useState([]);

  return (
    <div>
      <div className="ingredient-card-wrapper">
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

      <InputWithButton
        handleOnChange={async (e) => {
          if (e.target.value) {
            let result = await (
              await fetch(
                `/api/ingredient/suggest?phrase=${e.target.value}`
              )
            ).json();

            setSuggestedIngredients(result);
          } else {
            setSuggestedIngredients([]);
          }
        }}
      />

      <div className="ingredient-card-wrapper">
        {pickedIngredients.map((i, index) => {
          return (
            <IngredientCard
              key={index}
              title={i.name}
              unmountMe={() => {
                let temp = [];
                for (const ingredient of pickedIngredients) {
                  temp.push(ingredient)
                }
                temp.splice(index, 1);
                setPickedIngredients(temp);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default IngredientPicker;

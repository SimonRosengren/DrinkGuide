import React, { useState } from "react";
import "./recipe.scss";
import Button from "../button/button";

function Recipe(props) {
//   const { onClick, text } = props;
//   const [active, setActive] = useState(false);



  return (
    <div className="recipe__holder">
        <div className="recipe__imageHolder">
            <img src="https://i.pinimg.com/564x/5e/61/8f/5e618fd9e236032e31f09a33c884fbfb.jpg" />
        </div>
        <div className="recipe__title">
            <h3>Level:3</h3>
            <h3>A mocktail</h3>
        </div>
        <div className="recipe__instructions-wrapper">
            <p className="recipe__instructions">Im instructions, </p>
        </div>
        <Button text="Another one"   />
    </div>
  );
}

export default Recipe;

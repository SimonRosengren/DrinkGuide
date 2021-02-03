import React, { useState } from "react";
import "./ingredientCard.module.scss";

function IngredientCard(props) {
    const [isActive, setIsActive] = useState(false);
  const dismiss = () => {
    props.unmountMe();
  };

  const handleOnClick = (e) => {
    setIsActive(!isActive);
    if (props.handleOnClick) {
      props.handleOnClick(e);
    }
  };

  return (
    <div className={"ingredientCard"} onClick={(e) => handleOnClick(e)}>
      <h3>{props.title}</h3>
      {props.unmountMe ? <p onClick={dismiss}>x</p> : null}
    </div>
  );
}

export default IngredientCard;

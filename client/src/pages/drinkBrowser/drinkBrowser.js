import React, { useState, useEffect } from "react";
import styles from "./drinkBrowser.module.scss";

function DrinkBrowser(props) {
  useEffect(() => {
      
    var url = '/api/recipe/batch?';
    for (const ingredient of (props.pickedIngredients || [])) {
        url = `${url}&ingredients=${ingredient._id}`
    }
    fetch(url).then(r => r.json()).then(r => console.log(r))
  });
  return <div>Well hello there </div>;
}

export default DrinkBrowser;

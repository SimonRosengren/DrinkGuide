import React from 'react'
import PropTypes from 'prop-types'
import styles from "./recipe.module.scss";

export default function Recipe({drink}) {
    return(<div className={styles.wrapper}>
        <h2>{drink.name}</h2>
        <h4>{drink.description}</h4>
        <p>{drink.instructions}</p>
        <ul>
            {(drink.ingredients || []).map(ingredient => {
                return <li>{ingredient.name}</li> // Ingredient links goes here
            })}
        </ul>
    </div>);
}
import React from 'react'
import styles from "./recipe.module.scss";

export default function Recipe({ drink }) {
    return (<div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
            <h2>{drink.name}</h2>
        </div>
        <div className={styles.body}>
            <h4>{drink.description}</h4>
            <p>{drink.instructions}</p>
            <p>{JSON.stringify(drink)}</p>
            <ul>
                {(drink.ingredients || []).map((ingredient, index) => {
                    return <li key={ingredient._id || index}>{ingredient.name}</li> // Ingredient links goes here
                })}
            </ul>
        </div>
    </div>);
}
import React from 'react'
import styles from "./recipe.module.scss";
import { Image } from 'react-bootstrap'
import IngredientCard from './ingredientCard'

export default function Recipe({ drink }) {
    return (<div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
            <Image src='https://receptfavoriter.se/sites/default/files/romantico_cocktail_1200_1.jpg' fluid={true} className={styles.headerImage} />
            <div className={styles.headerText}>
                <h2>{drink.name}</h2>
                <i>{drink.description}</i>
            </div>
        </div>
        <div className={styles.body}>
            <div className={styles.ingredientWrapper}>
                {(drink.ingredients || []).map((ingredient, index) => {
                    return <IngredientCard ingredient={ingredient.name} qty={3} unit={'cl'} />
                })}
            </div>
            <h3>Instructions</h3>
            <p>{drink.instructions}</p>
        </div>
    </div>);
}
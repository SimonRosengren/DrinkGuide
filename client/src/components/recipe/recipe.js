import React from 'react'
import styles from './recipe.module.scss'
import { Image } from 'react-bootstrap'
import IngredientCard from './ingredientCard'

export default function Recipe({ drink }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <Image
          src="https://receptfavoriter.se/sites/default/files/romantico_cocktail_1200_1.jpg"
          fluid={true}
          className={styles.headerImage}
        />
        <div className={styles.headerText}>
          <h2>{drink.name}</h2>
        </div>
      </div>
      <div className={styles.body}>
        <p>
          <i>{drink.description}</i>
        </p>
        <h3>Ingredints</h3>
        <div className={styles.ingredientWrapper}>
          {(drink.ingredients || []).map((ingredient, index) => {
            return (
              <IngredientCard
                ingredient={ingredient.name}
                qty={ingredient.qty}
                unit={ingredient.unit}
              />
            )
          })}
        </div>
        <h3>Instructions</h3>
        <p>{drink.instructions}</p>
      </div>
    </div>
  )
}

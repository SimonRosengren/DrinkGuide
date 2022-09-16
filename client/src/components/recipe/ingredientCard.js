import React, { useState } from 'react'
import styles from './ingredientCard.module.scss'

export default function IngredientCard({ ingredient, qty, unit }) {
  const [checked, setChecked] = useState(false)

  return (
    <div
      className={checked ? styles.checked : styles.unchecked}
      onClick={() => {
        setChecked(!checked)
      }}
    >
      <b>{ingredient}</b>
      <p>
        {qty} {unit}
      </p>
    </div>
  )
}

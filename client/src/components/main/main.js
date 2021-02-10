import React, { useState } from 'react';
import styles from './main.module.scss';
import IngredientPicker from '../../pages/ingredientPicker/IngredientPicker';
function Main() {
    return (
        <div className={styles.main}>
            <IngredientPicker />
        </div>
    );
}

export default Main;
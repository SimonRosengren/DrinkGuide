import React, { useState } from 'react';
import './main.scss';
import IngredientPicker from '../ingredientPicker/IngredientPicker';
function Main() {
    return (
        <div className="main">
            <IngredientPicker />
        </div>
    );
}

export default Main;
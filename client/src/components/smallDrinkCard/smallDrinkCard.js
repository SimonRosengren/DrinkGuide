import React, { useState, useEffect } from "react";
import styles from "./smallDrinkCard.module.scss";
import { Image } from 'react-bootstrap'

function SmallDrinkCard(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
                <img src='https://www.obsid.se/wp-content/uploads/2013/05/averna-sour-drink-recept-1.jpg' />
            </div>
            <h4>{props.drink.name}</h4>
            <h4>{props.drink.score}</h4>
        </div>
    );
}

export default SmallDrinkCard;

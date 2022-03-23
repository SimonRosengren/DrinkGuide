import React, { useState, useEffect } from "react";
import styles from "./smallDrinkCard.module.scss";
import { Image } from 'react-bootstrap'

function SmallDrinkCard(props) {
    return (
        <div className={styles.wrapper}>
            <Image src='https://www.obsid.se/wp-content/uploads/2013/05/averna-sour-drink-recept-1.jpg' rounded={true} fluid={true} />
            <h3>{props.drink.name}</h3>
            <h3>{props.drink.score}</h3>
        </div>
    );
}

export default SmallDrinkCard;

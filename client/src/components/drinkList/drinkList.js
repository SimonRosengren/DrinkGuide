import React, { useState, useEffect } from "react";
import styles from "./drinkList.module.scss";
import SmallDrinkCard from "../smallDrinkCard/smallDrinkCard";

function DrinkList(props) {

    const [drinkList, setDrinkList] = useState([])

    useEffect(() => {
        const getData = async () => {
            let result = await fetch('/api/recipe/manybyids', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: props.ids })
            })
            result = await result.json()
            setDrinkList(result)
        }
        getData()
    }, [])


    return (
        <div className={styles.wrapper}>
            <ul>
                {drinkList.map(d => {
                    return <li><SmallDrinkCard drink={d} /></li>
                })}
            </ul>
        </div>
    );
}

export default DrinkList;

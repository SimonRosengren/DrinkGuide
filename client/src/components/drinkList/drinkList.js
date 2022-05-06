import React, { useState, useEffect } from "react";
import styles from "./drinkList.module.scss";
import SmallDrinkCard from "../smallDrinkCard/smallDrinkCard";
import ListItem from "../listItem/listItem";

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
                {drinkList.map((d, index) => {
                    return <li key={d._id || index}><ListItem content={{image: 'https://www.greenhasgroup.com/wp-content/uploads/2017/05/drin-1l-1.jpg', ...d}} /></li>
                })}
            </ul>
        </div>
    );
}

export default DrinkList;

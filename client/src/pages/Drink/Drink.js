import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import styles from './drink.module.scss'
import { useParams } from 'react-router-dom';
import Recipe from '../../components/recipe';

Drink.propTypes = {}

export default function Drink({}) {
    const [drink, setDrink] = useState({});

    let uuid = useParams();
    useEffect(() => {  
        (async () => {
            const result = await (await fetch(`/api/recipe?uuid=${uuid.uuid}`)).json();
            setDrink(result)
        })();
      }, [uuid]);

    return (
        <Recipe drink={drink}/>
    )
}
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'
import styles from './likedDrinks.module.scss'
import { Image } from 'react-bootstrap'
import fetchWithAuth from '../../services/requestService';
import DrinkList from '../../components/drinkList/drinkList'

function LikedDrinks() {
    const { currentUser } = useAuth()
    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await (await fetchWithAuth('/api/user')).json()
            setDrinks(userInfo.likedDrinks)
        }
        fetchUserInfo()
    }, []);

    return (
        <div className={styles.listWrapper}>
            { drinks.length ? <DrinkList ids={drinks} /> : <p>Fetchting...</p> }
        </div >
    );
}

export default LikedDrinks;
import React, { useEffect, useState } from 'react';
import styles from './profile.module.scss'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { Image } from 'react-bootstrap'
import Button from '../../components/button/button'
import { useAuth } from '../../contexts/AuthContext'
import fetchWithAuth from '../../services/requestService';
import DrinkList from '../../components/drinkList/drinkList';
import NavigationLinkBar from '../../components/navigationLinkBar/navigationLinkBar';
function Profile() {

    const { currentUser, signout } = useAuth()
    const [currentUserInfo, setCurrentUserInfo] = useState({})

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await (await fetchWithAuth('/api/user')).json()
            setCurrentUserInfo(userInfo)
        }
        fetchUserInfo()
    }, []);

    const handleSignout = async () => {
        await signout()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <Image src='https://i0.wp.com/www.judecoram.com/wp-content/uploads/2018/08/Low-Poly-Red-Panda.jpg?w=700&ssl=1' roundedCircle={true} fluid={true} />
                <h2>{currentUser.displayName}</h2>
                <h4>{currentUser.email}</h4>
                <h4>efternamn: {currentUserInfo.surName}</h4>

                <Button content={'Sign out'} onClick={handleSignout} className='w-100' />
            </div>
            <div className={styles.main}>
                <Router>
                    <NavigationLinkBar links={[{ path: '/profile/liked-drinks', text: 'Liked drinks' }, { path: '/profile/bar', text: 'My bar' }]} />
                    <Route path="/profile/liked-drinks"><DrinkList ids={currentUserInfo.likedDrinks} /></Route>
                    <Route path='/profile/bar'>{JSON.stringify(currentUserInfo)}</Route>
                </Router>
            </div>
        </div>
    );
}

export default Profile;
import React, { useEffect, useState } from 'react';
import styles from './profile.module.scss'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { Form, Card, Button, Container, Spinner, Alert, Image, Breadcrumb } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import fetchWithAuth from '../../services/requestService';
function Profile() {

    const { currentUser, signout } = useAuth()
    const [currentUserInfo, setCurrentUserInfo] = useState({})

    useEffect(async () => {
        const userInfo = await fetchWithAuth('/api/user')
        setCurrentUserInfo(userInfo)
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



                <Button onClick={handleSignout} className='w-100'>Sign out</Button>
            </div>
            <div className={styles.main}>
                <Router>
                    <NavLink to='/profile/one' replace>{JSON.stringify(currentUserInfo)}</NavLink>
                    <NavLink to='/profile/two' replace>Twe</NavLink>

                    <Route path="/profile/one" render={() => <div>Home</div>} />
                    <Route path='/profile/two'><h2>Two</h2></Route>
                    <Route path='/profile/three'><h2>Three</h2></Route>
                </Router>
            </div>
        </div>
    );
}

export default Profile;
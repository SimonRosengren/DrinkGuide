import React, { useRef, useState } from 'react';
import { Form, Card, Button, Container, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
function Profile() {

    const { currentUser, signout } = useAuth()

    const handleSignout = async () => {
        await signout()
    }

    return (
        <>
            { <h2>{currentUser.email}</h2> }
            <Button onClick={handleSignout} />
        </>
    );
}

export default Profile;
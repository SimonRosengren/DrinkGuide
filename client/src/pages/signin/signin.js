import React, { useRef, useState } from 'react';
import { Form, Card, Button, Container, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from "react-router-dom";

function Signin() {
    const passwordRef = useRef()
    const emailRef = useRef()
    const { signin, currentUser } = useAuth()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [alertFailure, setAlertFailure] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        let success;
        if (!loading) success = await signin(emailRef.current.value, passwordRef.current.value)
        setLoading(false)
        if (!success) {
            setAlertFailure(true)
        } else {
            history.push('/profile')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign in</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} type="submit" className='w-100'>{!loading ? 'Sign up' :
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            {alertFailure && <Alert variant="danger" onClose={() => setAlertFailure(false)} dismissible>
                <Alert.Heading>Something went wrong!</Alert.Heading>
                <p>Failed to sign in. Please try again!</p>
            </Alert>}
        </>
    );
}

export default Signin;
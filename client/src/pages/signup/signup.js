import React, { useRef } from 'react';
import { Form, Card, Button, Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

function Signup() {
    const passwordRef = useRef()
    const repeatPasswordRef = useRef()
    const emailRef = useRef()
    const { signup, currentUser } = useAuth()

    function handleSubmit(e) {
        e.preventDefault()
        signup(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <>
            <Container>
                <Card>
                    <Card.Body>
                        {currentUser}
                        <h2 className='text-center mb-4'>Sign up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id='passwordRepeat'>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control type='password' ref={repeatPasswordRef} required />
                            </Form.Group>
                            <Button type="submit" className='w-100'>Sign up</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Signup;
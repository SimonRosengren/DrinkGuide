import React, {useRef} from 'react';
import { Form, Card, Button } from 'react-bootstrap'

function Signup() {
    const passwordRef = useRef()
    const repeatPasswordRef = useRef()
    const emailRef = useRef()

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign up</h2>
                    <Form>
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
                        <Button className='w-100'>Sign up</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default Signup;
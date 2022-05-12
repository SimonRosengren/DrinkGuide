import React, { useRef, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from "react-router-dom";
import styles from './signup.module.scss'
import Button from '../../components/button/button'
import { BiEnvelope, BiLockAlt, BiUser } from "react-icons/bi";
import { Image } from 'react-bootstrap'
import bartender from '../../static/bartenderw.png'

function Signup() {
    const passwordRef = useRef()
    const repeatPasswordRef = useRef()
    const emailRef = useRef()
    const firstNameRef = useRef()
    const surNameRef = useRef()
    const displayNameRef = useRef()
    const { signup, currentUser } = useAuth()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [alertFailure, setAlertFailure] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        let success;
        if (!loading) success = await signup(emailRef.current.value, displayNameRef.current.value, firstNameRef.current.value, surNameRef.current.value, passwordRef.current.value)
        setLoading(false)
        if (!success) {
            setAlertFailure(true)
        } else {
            history.push('/profile')
        }
    }

    return (

        <div className={styles.wrapper}>
            <div className={styles.formWrapper}>
                <div className={styles.signUpLogo}>
                    <Image src={bartender} alt="Barman icons created by Freepik - Flaticon" roundedCircle={true} fluid={true} />
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.inputWrapper}>
                        <BiUser />
                        <input type='text' ref={displayNameRef} required placeholder='Display name' />
                    </div>
                    <div className={styles.inputWrapper}>
                        <BiUser />
                        <input type='text' ref={firstNameRef} required placeholder='First name' />
                    </div>
                    <div className={styles.inputWrapper}>
                        <BiUser />
                        <input type='text' ref={surNameRef} required placeholder='Surname' />
                    </div>
                    <div className={styles.inputWrapper}>
                        <BiEnvelope />
                        <input type='email' ref={emailRef} required placeholder='Email' />
                    </div>
                    <div className={styles.inputWrapper}>
                        <BiLockAlt />
                        <input type='password' ref={passwordRef} required placeholder='Password' />
                    </div >
                    <div className={styles.inputWrapper}>
                        <BiLockAlt />
                        <input type='password' ref={repeatPasswordRef} required placeholder='Repeat password' />
                    </div>

                    <Button content={!loading ? 'Sign up' : <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>} className={styles.loginButton} />
                </form >
                {alertFailure && <Alert variant="danger" onClose={() => setAlertFailure(false)} dismissible>
                    <Alert.Heading>Something went wrong!</Alert.Heading>
                    <p>
                        Make sure that
                        <ul>
                            <li>Password is atleast 6 characters</li>
                            <li>Email is valid</li>
                        </ul>
                    </p>
                </Alert>
                }
            </div >
        </div >


    );
}

export default Signup;
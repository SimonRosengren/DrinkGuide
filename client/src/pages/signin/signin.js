import React, { useRef, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from "react-router-dom";
import styles from './signin.module.scss'
import Button from '../../components/button/button'
import bartender from '../../static/bartender.png'
import { Image } from 'react-bootstrap'
import { BiEnvelope, BiLockAlt } from "react-icons/bi";

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
        <div className={styles.wrapper}>
            <div className={styles.formWrapper}>
                <div className={styles.loginLogo}>
                    <Image src={bartender} alt="Barman icons created by Freepik - Flaticon" roundedCircle={true} fluid={true} />
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <label><BiEnvelope /></label>
                        <input type='email' ref={emailRef} required />
                    </div>
                    <div className={styles.inputWrapper}>
                        <BiLockAlt />
                        <input type='password' ref={passwordRef} required />
                    </div>
                    <Button content={!loading ? 'Login' : <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>} className={styles.loginButton} />

                </form>
                {
                    alertFailure && <Alert variant="danger" onClose={() => setAlertFailure(false)} dismissible>
                        <Alert.Heading>Something went wrong!</Alert.Heading>
                        <p>Failed to sign in. Please try again!</p>
                    </Alert>
                }
            </div >
        </div >
    );
}

export default Signin;
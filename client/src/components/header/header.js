import React from 'react';
import styles from './header.module.scss';
import Logo from '../logo/logo';
import { useHistory } from "react-router-dom";

function Header() {
    const history = useHistory();
    const handleLogoClick = () => {
        history.push("/")
    }
    return (
        <div className={styles.header}>
            <Logo onClick={handleLogoClick}/>
        </div>
    );
}

export default Header;
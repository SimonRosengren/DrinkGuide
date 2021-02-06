import React from 'react';
import styles from './header.module.scss';
import Logo from '../logo/logo';

function Header() {
    return (
        <div className={styles.header}>
            <Logo />
        </div>
    );
}

export default Header;
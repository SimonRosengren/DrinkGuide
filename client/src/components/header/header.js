import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Logo from '../logo/logo';
import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'

function Menu({ showJobApplication }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuContainer = useRef(null);
    const { currentUser } = useAuth()

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setShowMenu(false);
            }
        };

        const handleClickOutside = (event) => {
            if (menuContainer && !menuContainer.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={styles.header} id="header" ref={menuContainer}>
            <Logo />
            <input
                type="checkbox"
                className={styles.navigationCheckbox}
                id="navi-toggle"
                onChange={(event) => {
                    setShowMenu(event.target.checked);
                }}
                checked={showMenu}
            />
            <label htmlFor="navi-toggle" className={styles.navigationButton}>
                <span className={styles.navigationIcon}>&nbsp;</span>
            </label>
            <nav
                className={classNames(
                    styles.menuNavigation,
                    showMenu && styles.menuVisible
                )}
            >
                <ul>
                    <li><NavLink to={'/'} onClick={() => setShowMenu(false)} className={styles.menuItem}>
                        Home
                    </NavLink></li>

                    <li>{currentUser && <NavLink to={'/profile'} onClick={() => setShowMenu(false)} className={styles.menuItem}>
                        Profile
                    </NavLink>
                    }</li>
                    <li>{!currentUser && <NavLink to={'/signin'} onClick={() => setShowMenu(false)} className={styles.menuItem}>
                        Sign in
                    </NavLink>
                    }</li>
                    <li>{!currentUser && <NavLink to={'/signup'} onClick={() => setShowMenu(false)} className={styles.menuItem}>
                        Sign up
                    </NavLink>
                    }</li>
                </ul>

            </nav>
        </header>
    );
}

export default Menu;
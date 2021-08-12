import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './menu.module.scss'
import MenuItem from '../MenuItem'

Menu.propTypes = {
}

export default function Menu({ }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuContainer = useRef(null);

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
        <nav role="navigation" ref={menuContainer}>
            <div id={styles.menuToggle}>
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id={styles.menu}>
                    <a href="#"><li>Login</li></a>
                    <a href="/add-recipe"><li>Add drink</li></a>
                    <a href="#"><li>About</li></a>
                </ul>
            </div>
        </nav>)
}
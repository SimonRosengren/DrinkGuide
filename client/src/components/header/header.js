import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Logo from '../logo/logo';
import styles from './header.module.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import { BiHomeCircle, BiUser, BiUserPlus, BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import { Image } from 'react-bootstrap'
import Button from '../../components/button/button'

function Menu({ showJobApplication }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuContainer = useRef(null);
    const { currentUser, signout } = useAuth()
    const history = useHistory()
    const handleSignout = async () => {
        setShowMenu(false);
        await signout()
    }

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
            <Logo onClick={() => {
                history.push('/')
            }} />
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
            <div className={classNames(
                styles.menu,
                showMenu && styles.menuVisible
            )}>
                {currentUser && <div className={styles.menuHeader}>
                    <div className={styles.profileImage}><Image src='https://i0.wp.com/www.judecoram.com/wp-content/uploads/2018/08/Low-Poly-Red-Panda.jpg?w=700&ssl=1' roundedCircle={true} fluid={true} /></div>
                    <h4>{currentUser.displayName}</h4>
                </div>}
                {!currentUser && <div className={styles.menuHeader}>
                    <h2>Welcome!</h2>
                    <p>Sign up for free and save your bar for the next time you use Drinkguide.</p>
                </div>}
                <nav>
                    <ul>
                        <li><NavLink to={'/'} onClick={() => setShowMenu(false)} className={styles.menuItem}>
                            <div className={styles.menuItem}><BiHomeCircle className={styles.icon} />Home</div>
                        </NavLink></li>

                        <li>{currentUser && <NavLink to={'/profile/liked-drinks'} onClick={() => setShowMenu(false)} className={styles.menuItem}>
                            <div className={styles.menuItem}><BiUser className={styles.icon} />Profile</div>
                        </NavLink>
                        }</li>
                        <li>{!currentUser && <NavLink to={'/signin'} onClick={() => setShowMenu(false)} className={styles.menuItem}>
                            <div className={styles.menuItem}><BiLogInCircle className={styles.icon} />Sign in</div>
                        </NavLink>
                        }</li>
                        <li>{!currentUser && <NavLink to={'/signup'} onClick={() => setShowMenu(false)} className={styles.menuItem}>
                            <div className={styles.menuItem}><BiUserPlus className={styles.icon} />Sign up</div>
                        </NavLink>
                        }</li>
                    </ul>

                </nav>
                <div className={styles.menuFooter}>
                    {currentUser && <Button content={<p><BiLogOutCircle /> Logout</p>} handleClick={handleSignout} className={styles.signOutButton} />}
                </div>
            </div>
        </header>
    );
}

export default Menu;
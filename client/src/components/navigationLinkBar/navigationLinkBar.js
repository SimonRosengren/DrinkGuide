import React, { useState } from "react";
import styles from "./navigationLinkBar.module.scss";
import { NavLink } from "react-router-dom";

function NavigationLinkBar({links}) {
    return (
        <div className={styles.bar}>
            {links.map((l, index) => {
                return <NavLink to={l.path} className={styles.link} activeClassName={styles.selected} replace>{l.text}</NavLink>
            })}
        </div>
    );
}

export default NavigationLinkBar;

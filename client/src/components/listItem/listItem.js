import React, { useState, useEffect } from "react";
import styles from "./listItem.module.scss";

function ListItem({ content }) {
    return (
        <div className={styles.wrapper}>
            {Object.keys(content).map((c, index) => {
                return <div className={c === 'image' ? styles.imageContainer : styles.itemContainer} key={c._id || index}>
                    {c === 'image' ? <img src={content[c]} /> : <h4>{content[c]}</h4>}
                </div>
            })}
        </div>
    );
}

export default ListItem;

import styles from './vote.module.scss';
import { BiDownvote } from "react-icons/bi";
import React, { useState } from 'react'
import fetchWithAuth from '../../services/requestService'
function Downvote(props) {
    const { id } = props
    const [active, setActive] = useState(!!props.active)

    const handleClick = async e => {
        props.handleDownvoteForParent()
        setActive(!active)
        await fetchWithAuth('/api/vote', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                vote: 'down',
                id
            })
        })
    }

    return (
        <BiDownvote onClick={handleClick} className={styles.vote} style={{ color: active ? 'tomato' : 'black' }} />
    );
}

export default Downvote;
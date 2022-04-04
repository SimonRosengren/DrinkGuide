import styles from './vote.module.scss';
import { BiUpvote } from "react-icons/bi";
import React, { useState } from 'react'
import fetchWithAuth from '../../services/requestService'
function Upvote(props) {
    const { id } = props
    const [active, setActive] = useState(!!props.active)

    const handleClick = async e => {
        setActive(!active)
        props.handleUpvoteForParent()
        await fetchWithAuth('/api/vote', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                vote: 'up',
                id
            })
        })
    }

    return (
        <BiUpvote onClick={handleClick} className={styles.vote} style={{ color: active ? '#f29195' : '#fafafa' }} />
    );
}

export default Upvote;
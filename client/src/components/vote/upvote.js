import styles from './vote.module.scss';
import { BiUpvote } from "react-icons/bi";
import React, { useState } from 'react'
import fetchWithAuth from '../../services/requestService'
function Upvote(props) {
    const { objId } = props
    const [active, setActive] = useState(!!props.active)

    const handleClick = async e => {
        setActive(!active)
        props.handleUpvoteForParent()
        await fetchWithAuth('/api/vote', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                vote: 'up',
                id: objId
            })
        })
    }

    return (
        <BiUpvote onClick={handleClick} className={styles.vote} style={{ color: active ? 'tomato' : 'black' }} />
    );
}

export default Upvote;
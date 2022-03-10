import styles from './vote.module.scss';
import { BiDownArrowAlt } from "react-icons/bi";
import React, { useState } from 'react'
import fetchWithAuth from '../../services/requestService'
function Downvote(props) {
    const { objId } = props
    const [active, setActive] = useState(!!props.active)

    const handleClick = async e => {
        setActive(!active)
        await fetchWithAuth('/api/vote', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                vote: 'down',
                id: objId
            })
        })
    }

    return (
        <div className={styles.wrapper}>
            <BiDownArrowAlt onClick={handleClick} style={{color: active ? 'blue' : 'red'}}/>
        </div>
    );
}

export default Downvote;
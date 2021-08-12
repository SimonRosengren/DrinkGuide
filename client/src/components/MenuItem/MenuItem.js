import React from 'react'
import PropTypes from 'prop-types'
import styles from './menu-item.module.scss'

MenuItem.propTypes = {
    handleClick: PropTypes.func,
    text: PropTypes.string
}

export default function MenuItem({handleClick, text}) {
    return (<div onClick={handleClick}>{text}</div>);
}
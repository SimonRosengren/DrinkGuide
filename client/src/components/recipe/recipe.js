import React from 'react'
import PropTypes from 'prop-types'
import styles from './recipe.module.scss'

Recipe.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    instructions: PropTypes.string,
    ingredients: PropTypes.array,
}

export default function Recipe({name, description, instructions, ingredients}) {
    <div>
        {name}
    </div>
}
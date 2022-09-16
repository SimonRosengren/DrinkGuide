import React, { useState } from 'react'
import styles from './ingredientPicker.module.scss'
import SuggestionSearch from '../../components/suggestionSearch/suggestionSearch'
import IngredientCard from '../../components/ingredientCard/ingredientCard'
import { BiDrink } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import Button from '../../components/button/button'
import liquor from '../../static/liquor.png'
import rum from '../../static/rum.png'
import shot from '../../static/shot.png'
import { Image } from 'react-bootstrap'
import CardWithClose from '../../components/cardWithClose/CardWithClose'

function IngredientPicker(props) {
  const [suggestedIngredients, setSuggestedIngredients] = useState([])
  const [renderInfoCard, setRenderInfoCard] = useState(true)
  const history = useHistory()

  const handleFindDrinks = () => {
    history.push('/browse')
  }

  return (
    <div className={styles.wrapper}>
      {renderInfoCard && (
        <CardWithClose
          className={styles.infoCard}
          content={
            <div className={styles.infoWrapper}>
              <div className={styles.contentWrapper}>
                <h2>Welcome!</h2>
                <p>
                  Start by adding the ingredients youu have to the list down
                  below and then click Find drinks to start browsing. Enjoy!
                </p>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={liquor}
                  alt="Barman icons created by Freepik - Flaticon"
                  fluid={true}
                />
              </div>
            </div>
          }
          unmount={() => setRenderInfoCard(false)}
        />
      )}
      <SuggestionSearch
        handleOnChange={async (e) => {
          if (e.target.value) {
            let result = await (
              await fetch(`/api/ingredient/suggest?phrase=${e.target.value}`)
            ).json()
            setSuggestedIngredients(result)
          } else {
            setSuggestedIngredients([])
          }
        }}
      />
      <div className={styles.barWrapper}>
        <div className={styles.leftColumn}>
          <h3>Suggestions</h3>
          <div className={styles.leftWrapper}>
            {suggestedIngredients.map((i, index) => {
              return (
                <IngredientCard
                  key={index}
                  title={i.name}
                  id={index}
                  handleOnClick={async (id) => {
                    const clickedIngredient = suggestedIngredients[id]
                    let temp = []
                    for (const ingredient of props.pickedIngredients) {
                      temp.push(ingredient)
                    }
                    temp.push(clickedIngredient)
                    props.setPickedIngredients(temp)
                  }}
                />
              )
            })}
          </div>
        </div>

        <div className={styles.rightColumn}>
          <h3>Your bar</h3>
          <div className={styles.rightWrapper}>
            {props.pickedIngredients.map((i, index) => {
              return (
                <IngredientCard
                  key={index}
                  title={i.name}
                  unmountMe={() => {
                    let temp = []
                    for (const ingredient of props.pickedIngredients) {
                      temp.push(ingredient)
                    }
                    temp.splice(index, 1)
                    props.setPickedIngredients(temp)
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
      <Button
        className={styles.nextButton}
        content={
          <p>
            Find drinks <BiDrink className={styles.icon} />
          </p>
        }
        handleClick={handleFindDrinks}
      />
    </div>
  )
}

export default IngredientPicker

import React, { useState } from "react";
import styles from "./ingredientPicker.module.scss";
import SuggestionSearch from "../../components/suggestionSearch/suggestionSearch";
import IngredientCard from "../../components/ingredientCard/ingredientCard";
import { BiDrink } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/button";
import liquor from '../../static/liquor.png'
import rum from '../../static/rum.png'
import shot from '../../static/shot.png'
import { Image } from 'react-bootstrap'

function IngredientPicker(props) {
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const history = useHistory();

  const handleFindDrinks = () => {
    history.push("/browse");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topInfoCard}>
        <div className={styles.infoCardContentWrapper}>
          <div className={styles.topImageWrapper}>
            <div className={styles.topLeftImageWrapper}>
              <Image src={liquor} alt="Barman icons created by Freepik - Flaticon" fluid={true} />
            </div>
            <div className={styles.topCenterImageWrapper}>
              <Image src={shot} alt="Barman icons created by Freepik - Flaticon" fluid={true} />
            </div>
            <div className={styles.topRightImageWrapper}>
              <Image src={rum} alt="Barman icons created by Freepik - Flaticon" fluid={true} />
            </div>
          </div>
          <div className={styles.content}>
            <p>Start by searching for any type of alcoholic or non-alcholic beverage that you've got at home.
              Then add the beverage to your bar by clicking it. Repeat this process until you've replicated your home bar.
              Click 'Find drinks' at the bottom of the page and get inspired by hundreds of exciting recipes. Enjoy!
            </p>
          </div>
        </div>

      </div>
      <SuggestionSearch
        handleOnChange={async (e) => {
          if (e.target.value) {
            let result = await (
              await fetch(`/api/ingredient/suggest?phrase=${e.target.value}`)
            ).json();
            setSuggestedIngredients(result);
          } else {
            setSuggestedIngredients([]);
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
                    const clickedIngredient = suggestedIngredients[id];
                    let temp = [];
                    for (const ingredient of props.pickedIngredients) {
                      temp.push(ingredient);
                    }
                    temp.push(clickedIngredient);
                    props.setPickedIngredients(temp);
                  }}
                />
              );
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
                    let temp = [];
                    for (const ingredient of props.pickedIngredients) {
                      temp.push(ingredient);
                    }
                    temp.splice(index, 1);
                    props.setPickedIngredients(temp);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Button className={styles.nextButton} content={<p>Find drinks <BiDrink className={styles.icon} /></p>} handleClick={handleFindDrinks} />
    </div>
  );
}

export default IngredientPicker;

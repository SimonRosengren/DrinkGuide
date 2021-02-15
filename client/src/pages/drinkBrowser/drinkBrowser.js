import React, { useState, useEffect } from "react";
import styles from "./drinkBrowser.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import DrinkCard from "../../components/drinkCard/drinkCard";

function DrinkBrowser(props) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const loadDrinks = async () => {
      var url = "/api/recipe/batch?";
      for (const ingredient of props.pickedIngredients || []) {
        url = `${url}&ingredients=${ingredient._id}`;
      }
      let result = await fetch(url);
      result = await result.json();
      setDrinks(result);
      console.log(result);
    };
    loadDrinks();
  }, [props.pickedIngredients]);

  const getConfigurableProps = () => ({
    showArrows: true,
    showStatus: false,
    showIndicators: false,
    infiniteLoop: true,
    showThumbs: false,
    useKeyboardArrows: true,
    swipeable: true,
    transitionTime: 150,
  });

  return (
    <div className={styles.wrapper}>
      <Carousel
        infiniteLoop
        centerMode
        centerSlidePercentage={80}
        {...getConfigurableProps()}
      >
        {drinks.map((d) => (
          <DrinkCard
            image={d.image.results[0].urls.regular}
            drinkName={d.name}
            drinkDescription={d.description}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default DrinkBrowser;

import React, { useState, useEffect } from "react";
import styles from "./drinkBrowser.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    };
    loadDrinks();
  }, [props.pickedIngredients]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true
  };
  return (
    <div className={styles.wrapper}>
      <Slider {...settings}>
        {drinks.map((d) => (
          <DrinkCard
            image={d.image.results[0].urls.regular}
            drinkName={d.name}
            drinkDescription={d.description}
            uuid={d._id}
          />
        ))}
      </Slider>
    </div>
  );
}

export default DrinkBrowser;

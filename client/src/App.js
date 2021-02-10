import React, { useState } from "react";
import Header from "./components/header/header";
import IngredientForm from "./components/ingredientForm/ingredientForm";
import IngredientPicker from "./pages/ingredientPicker/IngredientPicker";
import styles from "./App.module.scss";
import DrinkBrowser from "./pages/drinkBrowser/drinkBrowser";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [pickedIngredients, setPickedIngredients] = useState([]);

  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Switch>
          <Route path="/browse">
            <DrinkBrowser pickedIngredients={pickedIngredients} />
          </Route>
          <Route path="/">
            <IngredientPicker
              pickedIngredients={pickedIngredients}
              setPickedIngredients={setPickedIngredients}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

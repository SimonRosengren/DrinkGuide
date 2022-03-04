import React, { useState } from "react";
import Header from "./components/header/Header";
import IngredientForm from "./components/ingredientForm/ingredientForm";
import IngredientPicker from "./pages/ingredientPicker/IngredientPicker";
import Drink from './pages/Drink';
import styles from "./App.module.scss";
import DrinkBrowser from "./pages/drinkBrowser/drinkBrowser";
import Signup from "./pages/signup/signup";
import Signin from "./pages/signin/signin";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { Container } from 'react-bootstrap'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/profile/profile'


function App() {
  const [pickedIngredients, setPickedIngredients] = useState([]);

  return (
    <Router>
      <div className={styles.app}>
        <AuthProvider>
          <Header />
          <div className={styles.appBody}>
            <Switch>
              <Route path="/browse">
                <DrinkBrowser pickedIngredients={pickedIngredients} />
              </Route>
              <Route path="/add-recipe">
                <IngredientForm />
              </Route>
              <Route path="/drink/:uuid">
                <Drink />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/">
                <IngredientPicker
                  pickedIngredients={pickedIngredients}
                  setPickedIngredients={setPickedIngredients}
                />
              </Route>
            </Switch>
          </div>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;

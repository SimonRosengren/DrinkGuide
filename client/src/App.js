import './App.css';
import Main from './components/main/main';
import Header from './components/header/header';
import IngredientForm from './components/ingredientForm/ingredientForm'

function App() {
  return (
    <div className="App">
      <Header />
      <IngredientForm />
      <Main />
    </div>
  );
}

export default App;

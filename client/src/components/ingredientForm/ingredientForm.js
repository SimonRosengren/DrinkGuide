import React, { useState } from "react";
import "./ingredientForm.scss";

function IngredientForm(props) {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [qtyInput, setQtyInput] = useState(0);

  const suggestIngredients = async (e) => {
    setIngredientInput(e.target.value);
    if (e.target.value) {
      const result = await (
        await fetch(
          `/api/ingredient/suggest?phrase=${e.target.value}`
        )
      ).json();
      let temp = [];
      (result || []).forEach((i) => {
        temp.push(i); // We have _id here aswell
      });
      setSuggestions(temp);
    } else {
      setSuggestions([]);
    }
  };

  const handleIngredientsInput = (e) => {
    const clickedIngredient = suggestions.find((i) => i.name === e.target.innerHTML)
    setCurrentIngredient(clickedIngredient);
    setIngredientInput(e.target.innerHTML)
  };

  const addIngredient = () => {
    let temp = ingredients;
    temp.push({ 
        qtyInput,
        ...currentIngredient
     });
    setIngredients(temp);
    setIngredientInput("");
    setQtyInput("")
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipeName)
    const result = await fetch(`/api/recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: recipeName,
            description,
            instructions,
            ingredients
        })
    })
    
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="inputWrapper">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            className="fullsize"
            value={recipeName}
            onChange={(e) => {
              setRecipeName(e.target.value);
            }}
          />
        </div>

        <div className="inputWrapper">
          <label for="description">Description</label>
          <textarea
            type="text"
            name="description"
            className="fullsize"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div className="inputWrapper">
          <label for="instructions">Instructions</label>
          <textarea
            type="text"
            name="instructions"
            className="fullsize"
            value={instructions}
            onChange={(e) => {
              setInstructions(e.target.value);
            }}
          />
        </div>

        <div className="ingredientWrapper">
          <div className="suggestionWrapper">
            <div className="inputWrapper">
              <label for="ingredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                className="halfsize"
                value={ingredientInput}
                onChange={(e) => {
                  suggestIngredients(e);
                }}
              />
            </div>

            <div className="inputWrapper">
              <ul className="halfsize">
                {suggestions.map((s, index) => (
                  <li key={index} onClick={handleIngredientsInput}>
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <input type="text" name="qty" className="halfsize" value={qtyInput} onChange={e => setQtyInput(e.target.value)} />
          <button onClick={() => { addIngredient() }}>add</button>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default IngredientForm;

import React, { useState, useEffect } from "react";
import styles from "./ingredientForm.module.scss";
import IngredientSuggestionCard from "./ingredientSuggestionCard";

function IngredientForm(props) {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([])
  const [allTags, setAllTags] = useState([])
  const [tagLine, setTagLine] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [unitInput, setUnitInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [qtyInput, setQtyInput] = useState(0);

  const getAllTags = async () => {
      const t = await (await fetch('/api/tags/all')).json();
      setAllTags(t)
  }

  useEffect(() => {
    getAllTags()
  }, [])

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
      qty: qtyInput,
      ...currentIngredient,
      unit: unitInput
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
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.innerFormWrapper}>
          <div className={styles.inputWrapper}>
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
          <h2>All tags</h2>
          <div className={styles.tagMenu}>
              {allTags.map(t => {
                return <p onClick={e => {
                  console.log(e.target.textContent)
                  const tempArr = tags;
                  const clicked = allTags.find(ta => ta.name === e.target.textContent)
                  tempArr.push(clicked)
                  setTags(tempArr)
                }}>{t.tag}</p>
              })}
          </div>
          <h2>Chosen tags</h2>
          <div className={styles.tagMenu}>
            {tags.map(t => {
              return <p>{t.tag}</p>
            })}
          </div>
          <div className={styles.inputWrapper}>
            <label for="description">Tag line</label>
            <textarea
              type="text"
              name="tagLine"
              className="fullsize"
              value={tagLine}
              onChange={(e) => {
                setTagLine(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputWrapper}>
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
          
          <div className={styles.inputWrapper}>
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

          <div className={styles.ingredientsWrapper}>
            <div className={styles.ingredinetAreaWrapper}>
              <div className={styles.ingredientInputWrapper}>
                <div className={styles.inputWrapper}>
                  <label for="ingredients">Ingredients</label>
                  <input
                    type="text"
                    name="ingredients"
                    value={ingredientInput}
                    onChange={(e) => {
                      suggestIngredients(e);
                    }}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label for="qty">Amount</label>
                  <input type="text" name="qty" value={qtyInput} onChange={e => setQtyInput(e.target.value)} />
                </div>
                <div className={styles.inputWrapper}>
                  <label for="qty">Unit</label>
                  <input type="text" name="unit" value={unitInput} onChange={e => setUnitInput(e.target.value)} />
                </div>
              </div>
              <div className={styles.suggestionsWrapper}>
                <ul>
                  {suggestions.map((s, index) => (
                    <IngredientSuggestionCard key={index} text={s.name} handleIngredientsInput={handleIngredientsInput} />
                  ))}
                </ul>
              </div>
            </div>
            <button type="button" className={styles.addIngredientButton} onClick={() => { addIngredient() }}>+</button>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <div className={styles.previewWrapper}>
          <div>
            <h4>Recipe</h4>
            <ul>
              {ingredients.map(i => {
                return <li>{i.name} {i.qtyInput}</li>
              })}
            </ul>
          </div>
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default IngredientForm;

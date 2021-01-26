import React, { useState } from "react";
import "./ingredientForm.scss";


function IngredientForm(props) {
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [suggestions, setSuggestions] = useState([]);


    const suggestIngredients = async e => {
        setIngredientInput(e.target.value)
        if (e.target.value) {


            const result = await (await fetch(`http://localhost:8000/api/ingredient/suggest?phrase=${e.target.value}`)).json()
            let temp = [];
            (result || []).forEach(i => {
                temp.push(i.name); // We have _id here aswell
            })
            setSuggestions(temp);
        } else {
            setSuggestions([])
        }

    }

    const handleIngredientsInput = e => {
        let temp = ingredients;
        temp.push(e.target.innerHTML);
        setIngredients(temp)
        setIngredientInput('')
        setSuggestions([])
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(ingredients)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                <input typ="text" value={recipeName} onChange={e => { setRecipeName(e.target.value) }} />
                </label>
                <label>
                    description:
                <input typ="text" value={description} onChange={e => { setDescription(e.target.value) }} />
                </label>
                <label>
                    instructions:
                <input typ="text" value={instructions} onChange={e => { setInstructions(e.target.value) }} />
                </label>
                <div>
                    <label>
                        ingredients:
                <input typ="text" value={ingredientInput} onChange={e => { suggestIngredients(e) }} />
                        <ul>
                            {suggestions.map((s, index) => <li key={index} onClick={handleIngredientsInput}>{s}</li>)}
                        </ul>
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default IngredientForm;

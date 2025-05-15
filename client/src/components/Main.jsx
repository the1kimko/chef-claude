import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromBackend } from "../api/ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState(["chicken", "all the main spices", "corn", "heavy cream", "pasta"])

    const [recipe, setRecipe] = React.useState(false);

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromBackend(ingredients)
        setRecipe(recipeMarkdown)
    }

    

    // Using onSubmit on our form
    // function handleSubmit(event) {
    //     event.preventDefault(); 
    //     //console.log("Form submitted");
    //     const formData = new FormData(event.currentTarget);
    //     const newIngredient = formData.get('ingredient');
    //     //console.log(newIngredient);
    //     // ingredients.push(newIngredient)
    //     setIngredients(prev => [...prev, newIngredient]);
    // }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredient => [...prevIngredient, newIngredient]);
    }

    return (
       <main>
        <form
            action={addIngredient}
            className="add-ingredient-form"
        >
            <input 
                type="text"
                name="ingredient"
                placeholder="e.g Oregano"
                aria-label="Add ingredient" 
            />
            <button>Add ingredient</button>
        </form>
        {ingredients.length > 0 && 
            <IngredientsList 
                ingredients={ingredients}
                getRecipe={getRecipe} 
            />
        }

        {recipe && <ClaudeRecipe recipe={recipe} />}
       </main> 
    );
}
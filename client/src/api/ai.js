export async function getRecipeFromBackend(ingredients) {
    const res = await fetch("http://localhost:5000/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });
  
    const data = await res.json();
    return data.recipe;
  }
  
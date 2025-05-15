export async function getRecipeFromBackend(ingredients) {
    const res = await fetch("https://chef-claude-c7z4.onrender.com/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });
  
    const data = await res.json();
    return data.recipe;
  }
  
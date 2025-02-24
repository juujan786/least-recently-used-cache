import React, { useState } from "react";
import useRecipeSearch from "./hooks/useRecipeSearch";
import useRecipeDetails from "./hooks/useRecipeDetails";

const RecipeSearch = () => {
  const { recipes, searchRecipes } = useRecipeSearch();
  const { recipe, fetchRecipe } = useRecipeDetails();
  const [query, setQuery] = useState("");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🔍 Search & View Recipes</h1>

      {/* Search Bar */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={() => searchRecipes(query)} style={{ padding: "10px" }}>
        Search
      </button>

      {/* Search Results */}
      {recipes.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {recipes.map((r) => (
              <li key={r.id} style={{ marginBottom: "10px" }}>
                <button onClick={() => fetchRecipe(r.id)}>
                  {r.name} ({r.cuisine})
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Viewed Recipe Details */}
      {recipe && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2>{recipe.name}</h2>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{ width: "200px", borderRadius: "5px" }}
          />
          <p>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <p>
            <strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins |{" "}
            <strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins
          </p>
          <p>
            <strong>Calories per Serving:</strong> {recipe.caloriesPerServing}
          </p>
          <p>
            <strong>Rating:</strong> {recipe.rating} ⭐ ({recipe.reviewCount}{" "}
            reviews)
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;

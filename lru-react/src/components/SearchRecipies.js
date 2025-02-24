import { useState } from "react";
import useRecipeSearch from "../hooks/useRecipeSearch";
import useRecipeDetails from "../hooks/useRecipeDetails";

const SearchRecipes = () => {
  const { recipes, searchRecipes, cachedQueries } = useRecipeSearch();
  const { recipe, fetchRecipe } = useRecipeDetails();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchRecipes(value);
  };

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search recipes..."
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      />

      {/* Show Cached Searches When Input is Empty */}
      {!query && cachedQueries.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <p style={{ fontWeight: "bold" }}>Recent Searches:</p>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {cachedQueries.map((cachedQuery) => (
              <li
                key={cachedQuery}
                onClick={() => {
                  setQuery(cachedQuery);
                  searchRecipes(cachedQuery);
                }}
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                  marginBottom: "5px",
                }}
              >
                {cachedQuery}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Recipes */}
      <div style={{ marginTop: "16px" }}>
        {recipes.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {recipes.map((r) => (
              <li
                key={r.id}
                onClick={() => fetchRecipe(r.id)}
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#f9f9f9",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#eaeaea")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#f9f9f9")
                }
              >
                <img
                  src={r.image}
                  alt={r.name}
                  style={{ width: "50px", height: "50px", borderRadius: "4px" }}
                />
                {r.name}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#777" }}>No recipes found.</p>
        )}
      </div>

      {/* Display Selected Recipe */}
      {recipe && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {recipe.name}
          </h2>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{
              width: "100%",
              maxWidth: "300px",
              marginBottom: "10px",
              borderRadius: "4px",
            }}
          />
          <p>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes
          </p>
          <p>
            <strong>Cooking Time:</strong> {recipe.cookTimeMinutes} minutes
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings}
          </p>
          <p>
            <strong>Ingredients:</strong>{" "}
            {recipe.ingredients ? recipe.ingredients.join(", ") : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchRecipes;

import { useState } from "react";
import LRUCache from "../utils/lruCache"; // Import LRU Cache

const viewCache = new LRUCache(5); // Store last 5 viewed recipes

const useRecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = (id) => {
    const cachedRecipe = viewCache.getItem(id);
    if (cachedRecipe) {
      setRecipe(cachedRecipe);
      return;
    }

    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        viewCache.setItem(id, data); // Cache recipe
        setRecipe(data);
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  return { recipe, fetchRecipe };
};

export default useRecipeDetails;

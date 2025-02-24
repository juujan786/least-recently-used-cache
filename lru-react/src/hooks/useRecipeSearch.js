import { useState } from "react";
import LRUCache from "../utils/lruCache"; // Import LRU Cache

const searchCache = new LRUCache(5); // Store the last 5 searches

const useRecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [cachedQueries, setCachedQueries] = useState([]);

  console.log("cachedQueries", cachedQueries);

  const searchRecipes = (query) => {
    if (!query) {
      // Show cached searches when input is empty
      setCachedQueries(Array.from(searchCache.cache.keys()));
      return;
    }

    const cachedResult = searchCache.getItem(query);
    if (cachedResult) {
      setRecipes(cachedResult);
      return;
    }

    fetch(`https://dummyjson.com/recipes/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        searchCache.setItem(query, data.recipes); // Store search results
        setRecipes(data.recipes);
        setCachedQueries([]); // Hide cache when searching
      })
      .catch((error) => console.error("Error searching recipes:", error));
  };

  return { recipes, searchRecipes, cachedQueries };
};

export default useRecipeSearch;

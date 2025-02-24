import React from "react";
import useLRUImageCache from "./useLRUImageCache";

const ImageComponent = ({ imageUrl }) => {
  const cachedImage = useLRUImageCache(imageUrl);

  return (
    <div>
      {cachedImage ? (
        <img src={cachedImage} alt="Cached" width="200" height="200" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

const App = () => {
  const imageUrls = [
    "https://cdn.dummyjson.com/recipe-images/1.webp",
    "https://cdn.dummyjson.com/recipe-images/2.webp",
    "https://cdn.dummyjson.com/recipe-images/3.webp",
    "https://cdn.dummyjson.com/recipe-images/4.webp",
    "https://cdn.dummyjson.com/recipe-images/5.webp",
    "https://cdn.dummyjson.com/recipe-images/6.webp",
    "https://cdn.dummyjson.com/recipe-images/7.webp",
    "https://cdn.dummyjson.com/recipe-images/8.webp",
  ];

  return (
    <div>
      <h2>LRU Image Cache</h2>
      {imageUrls.map((url) => (
        <ImageComponent key={url} imageUrl={url} />
      ))}
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  getItem(key) {
    if (!this.cache.has(key)) return null;

    // Move accessed item to the front (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  setItem(key, value) {
    if (this.cache.has(key)) {
      // Remove and reinsert to maintain the order
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first key in Map)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    // Insert new item at the end (most recently used)
    this.cache.set(key, value);
  }
}

// Initialize LRU Cache with capacity 5
const imageCache = new LRUCache(5);

const useLRUImageCache = (imageUrl) => {
  const [cachedImage, setCachedImage] = useState(imageCache.getItem(imageUrl));

  useEffect(() => {
    if (!cachedImage) {
      // Fetch and cache the image
      fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const imageObjectUrl = URL.createObjectURL(blob);
          imageCache.setItem(imageUrl, imageObjectUrl);
          setCachedImage(imageObjectUrl);
        });
    }
  }, [imageUrl, cachedImage]);

  return cachedImage;
};

export default useLRUImageCache;

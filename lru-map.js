class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Maintains order of insertion
  }

  getItem(key) {
    if (!this.cache.has(key)) return -1; // Return -1 if key not found
    const value = this.cache.get(key);
    this.cache.delete(key); // Remove from current position
    this.cache.set(key, value); // Reinsert to update "recently used"
    return value;
  }

  setItem(key) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // Remove it so we can reinsert
    } else if (this.cache.size >= this.capacity) {
      // Remove the least recently used item (first inserted)
      const firstKey = this.cache.keys().next().value; // Get first key
      this.cache.delete(firstKey);
    }
    this.cache.set(key, key); // Insert as the most recently used
    console.log("Cache:", [...this.cache.keys()]);
  }
}

const cache = new LRUCache(5);

cache.setItem("a");
cache.setItem("b");
cache.setItem("c");
cache.setItem("a");
cache.setItem("d");
cache.setItem("b");
cache.setItem("a");
cache.setItem("d");
cache.setItem("e");
cache.setItem("f"); // This should remove 'c' (least recently used)

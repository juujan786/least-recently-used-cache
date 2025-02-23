class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = [];
  }

  getItem(key) {
    const index = this.cache.indexOf(key);
    if (index === -1) return -1; // Not found

    // Move the accessed item to the front (most recently used)
    this.cache.splice(index, 1);
    this.cache.unshift(key);
    return key;
  }

  setItem(key) {
    const index = this.cache.indexOf(key);

    if (index !== -1) {
      // If item exists, remove it from its current position
      this.cache.splice(index, 1);
      console.log("cache removing: ", this.cache);
    } else if (this.cache.length >= this.capacity) {
      // If cache is full, remove the least recently used item (last element)
      this.cache.pop();
    }

    // Insert the new item at the front (most recently used)
    this.cache.unshift(key);
    console.log("Cache:", this.cache);
  }
}

const cache = new LRUCache(5);

cache.setItem("a");
cache.setItem("b");
cache.setItem("c");
cache.setItem("a");
cache.setItem("a");
cache.setItem("a");
cache.setItem("d");
cache.setItem("b");
cache.setItem("a");
cache.setItem("d");
cache.setItem("e");
cache.setItem("f");

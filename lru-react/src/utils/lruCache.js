class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // HashMap for O(1) lookup
    this.head = new ListNode(null, null);
    this.tail = new ListNode(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  getItem(key) {
    if (!this.cache.has(key)) return null;

    const node = this.cache.get(key);
    this._remove(node);
    this._addToFront(node);

    return node.value;
  }

  setItem(key, value) {
    if (this.cache.has(key)) {
      this._remove(this.cache.get(key));
    } else if (this.cache.size >= this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.cache.delete(lru.key);
    }

    const newNode = new ListNode(key, value);
    this.cache.set(key, newNode);
    this._addToFront(newNode);

    console.log("cache", this.cache);
  }
}

export default LRUCache;

/**
 * https://leetcode.com/problems/lru-cache/description/
 *
 * Approach: Using a Doubly Linked List to store the Least Recently Used data which is the key-value pairs. Besides that, we use a hash table cache, to store the added key-value pairs. This will provide us the constant time when accessing the key-value pairs instead of accessing directly from the doubly linked list.
 */
class LRUCache {
  constructor(capacity) {
    this.cache = {};
    this.capacity = capacity || 1;
    this.currentSize = 0;
    this.listOfMostRecent = new DoublyLinkedList();
  }

  // Time/Space complexities: O(1)
  put(key, value) {
    // If the key is not in the cache
    if (!this.cache[key]) {
      // If we reach the max size, we remove the least recent from the cache
      if (this.currentSize === this.capacity) {
        this.evictLeastRecent();
      } else {
        // We increase the current size to keep track of the size of the cache each time we add a new key-value pair
        this.currentSize += 1;
      }

      // Add a new key-value pair as a DoublyLinkedList Node to the cache
      this.cache[key] = new DoublyLinkedListNode(key, value);
    } else {
      // Otherwise, if the key is already exists in the cache
      // We update the existing key with the new value
      this.replaceKey(key, value);
    }

    // Update the most recent key to be the newly added key
    this.updateMostRecent(this.cache[key]);
  }

  // Time/Space complexities: O(1)
  get(key) {
    // If the key is not exists, return -1
    if (!this.cache[key]) return -1;
    // Otherwise, we update the most recent key to be the retrieved key
    this.updateMostRecent(this.cache[key]);
    // And return its value
    return this.cache[key].value;
  }

  replaceKey(key, value) {
    if (!this.cache[key]) {
      return;
    }
    // Override the exist value
    this.cache[key].value = value;
  }

  evictLeastRecent() {
    let keyToRemove = this.listOfMostRecent.tail.key;
    // We need to find the tail because in a doubly linked list,
    // the least recent used key-value pair will be the tail of the list
    this.listOfMostRecent.removeTail();
    // Delete the key from the cache
    delete this.cache[keyToRemove];
  }

  updateMostRecent(node) {
    this.listOfMostRecent.setHeadTo(node);
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHeadTo(node) {
    if (this.head === node) {
      return;
    } else if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else if (this.head === this.tail) {
      this.tail.prev = node;
      this.head = node;
      this.head.next = this.tail;
    } else {
      if (this.tail === node) this.removeTail();
      node.removeBindings();
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  removeTail() {
    if (this.tail === null) return;
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
      return;
    }

    this.tail = this.tail.prev;
    this.tail.next = null;
  }
}

class DoublyLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  removeBindings() {
    if (this.prev !== null) {
      this.prev.next = this.next;
    }
    if (this.next !== null) {
      this.next.prev = this.prev;
    }

    this.prev = null;
    this.next = null;
  }
}

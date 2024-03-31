/**
 * Implement an LRUCache class for a Least Recently Used (LRU) cache. The class should support:
 *  Inserting key-value pairs with the insertKeyValuePair method.
 *  Retrieving a key's value with the getValueFromKey method.
 *  Retrieving the most recently used (the most recently inserted or retrieved) key with the getMostRecentKey method.
 *
 * Each of these methods should run in constant time.
 *
 * Additionally, the LRUCache class should store a maxSize property set to the size of the cache, which is passed in as an argument during instantiation. This size represents the maximum number of key-value pairs that the cache can store at once. If a key-value pair is inserted in the cache when it has reached maximum capacity, the least recently used key-value pair should be evicted from the cache and no longer retrievable; the newly added key-value pair should effectively replace it.
 *
 * Note that inserting a key-value pair with an already existing key should simply replace the key's value in the cache with the new value and shouldn't evict a key-value pair if the cache is full. Lastly, attempting to retrieve a value from a key that isn't in the cache should return None / null.
 *
 * Sample Usage:
 * // All operations below are performed sequentially
 * LRUCache(3): - // instantiate an LRUCache of size 3
 * insertKeyValuePair("b", 2): -
 * insertKeyValuePair("b", 1): -
 * insertKeyValuePair("c", 3): -
 * getMostRecentKey(): "c" // "c" was the most recently inserted key
 * getValueFromKey("a"): 1
 * getMostRecentKey(): "a" // "a" was the most recently retrieved key
 * insertKeyValuePair("d", 4) - // the cache had 3 entries; the least recently used one is evicted
 * getValueFromKey("b"): null // "b" was evicted in the previous operation
 * insertKeyValuePair("a", 5): - // "a" already exists in the cache so its value just gets replaced
 * getValueFromKey("5"): 5
 */

/**
 * Approach: Using a Doubly Linked List to store the Least Recently Used data which is the key-value pairs. Besides that, we use a hash table cache, to store the added key-value pairs. This will provide us the constant time when accessing the key-value pairs instead of accessing directly from the doubly linked list.
 */
class LRUCache {
  constructor(maxSize) {
    this.cache = {};
    this.maxSize = maxSize || 1;
    this.currentSize = 0;
    this.listOfMostRecent = new DoublyLinkedList();
  }

  // Time/Space complexities: O(1)
  insertKeyValuePair(key, value) {
    // If the key is not in the cache
    if (!this.cache[key]) {
      // If we reach the max size, we remove the least recent from the cache
      if (this.currentSize === this.maxSize) {
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
  getValueFromKey(key) {
    // If the key is not exists, return null
    if (!this.cache[key]) return null;
    // Otherwise, we update the most recent key to be the retrieved key
    this.updateMostRecent(this.cache[key]);
    // And return its value
    return this.cache[key].value;
  }

  // Time/Space complexities: O(1)
  getMostRecentKey() {
    // If there is no head in the list, we do nothing
    if (!this.listOfMostRecent.head) return;
    // The most recent key would be the first key of the cache
    // Or we could say it's the head of the doubly linked list
    // Then we will return the key at the head of the list
    return this.listOfMostRecent.head.key;
  }

  replaceKey(key, value) {
    if (!this.cache[key]) {
      throw new Error("The provided key isn't in the cache!");
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

import { hash } from './hash-function.js';

export class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  #hash(key) {
    return hash(key, this.keyMap.length);
  }

  /**
   * The set function takes a key and a value, hashes the key, and adds the hashed key and value to the `keyMap` array.
   *
   * Pseudocode - Set
   *
   * 1. Accepts a `key` and a `value`
   * 2. Hashes the key
   * 3. Stores the `key-value` pair in the hash table array via separate chaining
   *
   * @param key - The key parameter is the key that will be used to store the value in the key-value
   * pair.
   * @param value - The value parameter represents the value that you want to associate with the key in
   * the key-value pair.
   * @returns The return value of the `set` method is the result of the `push` method, which is the new
   * length of the `keyMap` array after adding the new key-value pair.
   */
  set(key, value) {
    const index = this.#hash(key);

    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
    return this;
  }

  /**
   * The `get` function retrieves the value associated with a given key from a hash map.
   *
   * Pseudocode - Get
   *
   * 1. Accepts a key
   * 2. Hashes the key
   * 3. Retrieves the `key-value` pair from the hash table
   * 4. If the key is found, return it, otherwise, return `undefined`
   *
   * @param key - The `key` parameter is the key that is used to retrieve a value from the `keyMap`.
   * @returns The value associated with the given key is being returned. If the key does not exist in the
   * keyMap, then undefined is returned.
   */
  get(key) {
    const keyMap = this.keyMap;
    const index = this.#hash(key);

    if (keyMap[index]) {
      for (let i = 0; i < keyMap[index].length; i++) {
        if (keyMap[index][i][0] === key) {
          return keyMap[index][i];
        }
      }
    }

    return undefined;
  }

  /**
   * The function `getKeysOrValues` returns an array of unique keys or values from a hash table.
   * @param index - The `index` parameter in the `getKeysOrValues` function represents the index of the key or value that you want to retrieve from the `keyMap` array. Index equals `0` to retrieve all the keys and index equals `1` to retrieve all the values
   * @returns an array of keys or values from the keyMap object, depending on the value of the index parameter.
   */
  getKeysOrValues(index) {
    const keyMap = this.keyMap;
    let results = [];

    for (let i = 0; i < keyMap.length; i++) {
      if (keyMap[i] && keyMap[i].length) {
        // This means the index has more than one key-values pair
        if (keyMap[i].length > 1) {
          for (let j = 0; j < keyMap[i].length; j++) {
            // Remove the duplicate values
            if (!results.includes(keyMap[i][j][index])) {
              results.push(keyMap[i][j][index]);
            }
          }
        } else {
          results.push(keyMap[i][0][index]);
        }
      }
    }

    return results;
  }

  /**
   * The function returns an array of non-empty items from a keyMap.
   * @returns an array of items.
   */
  printHashTableAsArray() {
    const keyMap = this.keyMap;
    let items = [];

    for (const item of keyMap) {
      item && item.length && items.push(item);
    }

    return items;
  }
}

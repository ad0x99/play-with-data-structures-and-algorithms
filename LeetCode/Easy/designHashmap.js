/**
 * https://leetcode.com/problems/design-hashmap/description/
 *
 * Array Approach
 *
 * 1. We initialize an empty array with fixed capacity to store the data.
 * 2. The getBucketIndex function is used for get the index of specified bucket in the array.
 * 3. The put function is used to add or update a new key-value pair in the array.
 * - 3.1: We get the bucket index of the current key.
 * - 3.2: We iterate through the bucket.
 * - 3.3: We extract the key and value of the current bucket.
 * - 3.4: We update the existing key-value pair if the key is found.
 * - 3.5: Otherwise, we push the new key-value pair to the bucket array if the key isn't found.
 *
 * 4. The get function is used to get the value of the specified key.
 * - 4.1: We iterate over key-value pairs within the bucket
 * - 4.2: We return the value if the key is found.
 * - 4.3: Otherwise, we return `-1` if the key isn't found.
 *
 * 5. The remove function is used to remove a key-value pair from the array.
 * - 5.1: We get the bucket index of the current key.
 * - 5.2: We iterate through the bucket.
 * - 5.3: We extract the key and value of the current bucket.
 * - 5.4: We delete the existing key-value pair if the key is found by using splice method to remove the key-value pair at the specific index if found.
 *
 * Time complexity: O(n) in the worst case, particularly when:
 * - Collisions: If the hashing function frequently maps multiple keys to the same bucket index, it leads to collisions. In this case, the put, get, and remove operations might need to iterate through a longer list of elements within the bucket to find the target key, increasing the time complexity.
 * - Poor Hashing Function: A poorly designed hashing function that creates many collisions can significantly slow down all operations in the worst case.
 *
 * Space complexity:
 * - O(n) In the worst case, where the number of key-value pairs (n) stored in the HashMap is very large compared to the number of buckets, it can lead to a high number of collisions and longer bucket lists. This increases the space used to store these elements.
 * - O(1): In the average case, with a good hashing function and appropriate bucket sizing, the space complexity remains constant. The number of elements per bucket stays relatively low, and the overall space usage grows linearly with the number of key-value pairs added.
 */
class MyHashMap {
  constructor(capacity = 10000) {
    // Initialize buckets with empty arrays
    this.buckets = new Array(capacity).fill([]);
    this.capacity = capacity;
  }

  getBucketIndex(key) {
    return key % this.buckets.length;
  }

  put(key, value) {
    const bucketIndex = this.getBucketIndex(key);

    for (let i = 0; i < this.buckets[bucketIndex].length; i++) {
      const [existingKey, _] = this.buckets[bucketIndex][i];

      if (existingKey === key) {
        // Update existing key-value pair
        this.buckets[bucketIndex][i] = [key, value];
        return;
      }
    }

    // Add new key-value pair to the bucket
    this.buckets[bucketIndex].push([key, value]);
  }

  get(key) {
    const bucketIndex = this.getBucketIndex(key);

    for (const [existingKey, value] of this.buckets[bucketIndex]) {
      if (existingKey === key) {
        return value;
      }
    }

    // Key not found
    return -1;
  }

  remove(key) {
    const bucketIndex = this.getBucketIndex(key);

    for (let i = 0; i < this.buckets[bucketIndex].length; i++) {
      const [existingKey] = this.buckets[bucketIndex][i];

      if (existingKey === key) {
        // Remove key-value pair at index i
        this.buckets[bucketIndex].splice(i, 1);
        return;
      }
    }
  }
}

/**
 * Add load factor and apply dynamic resizing using rehashing function
 *
 * Time complexity: ~ O(1)
 */
class MyHashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    // Initialize buckets with empty arrays
    this.buckets = new Array(capacity).fill([]);
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  getBucketIndex(key) {
    return key % this.buckets.length;
  }

  rehashing() {
    // Store old buckets
    let oldBuckets = this.buckets;

    // Create a new bucket with double size from the old bucket
    this.capacity = this.capacity * 2;
    this.buckets = new Array(this.capacity).fill([]);
    this.size = 0;

    // Re-insert elements into new buckets with larger capacity
    for (let bucket of oldBuckets) {
      for (const [k, v] of bucket) {
        this.put(k, v);
      }
    }
  }

  put(key, value) {
    const bucketIndex = this.getBucketIndex(key);

    for (let i = 0; i < this.buckets[bucketIndex].length; i++) {
      const [existingKey, _] = this.buckets[bucketIndex][i];

      if (existingKey === key) {
        // Update existing key-value pair
        this.buckets[bucketIndex][i] = [key, value];
        return;
      }
    }

    // Add new key-value pair to the bucket
    this.buckets[bucketIndex].push([key, value]);
    this.size += 1;

    if (this.size / this.buckets.length > this.loadFactor) {
      this.rehashing();
    }
  }

  get(key) {
    const bucketIndex = this.getBucketIndex(key);

    for (const [existingKey, value] of this.buckets[bucketIndex]) {
      if (existingKey === key) {
        return value;
      }
    }

    // Key not found
    return -1;
  }

  remove(key) {
    const bucketIndex = this.getBucketIndex(key);

    for (let i = 0; i < this.buckets[bucketIndex].length; i++) {
      const [existingKey] = this.buckets[bucketIndex][i];

      if (existingKey === key) {
        // Remove key-value pair at index i
        this.buckets[bucketIndex].splice(i, 1);
        this.size -= 1;
        return;
      }
    }
  }
}

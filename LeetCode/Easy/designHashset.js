/**
 * https://leetcode.com/problems/design-hashset/description/
 *
 * Build HashSet using Hash Table in array representation.
 *
 * 1. We initialize two properties:
 * - `capacity`: This defines the initial size of the hash table (set to 10000 in this example).
 * - `buckets`: This is an array with a fixed length (capacity) used to store the elements. Each bucket is initially an empty array.
 *
 * 2. The `getBucketIndex` method takes a key as input and calculates a bucket index using the `modulo` operator (`%`) by dividing the key by the `capacity`. This maps the key to a specific bucket within the buckets array.
 *
 * 3. The `add` function is used to adding a new key to the hash table. This function takes a key as input.
 * - 3.1: We call `getBucketIndex` method to determine the bucket index for the key.
 *
 * - 3.2: We push the key to the bucket (this.buckets[bucketIdx]) at the calculated index.
 *
 * 4. The `remove` function is used to remove the key from the hash table. This function takes a key as input.
 * - 4.1: We call `getBucketIndex` method to determine the bucket index for the key.
 *
 * - 4.2: We use the filter method on the bucket array to create a new array containing only elements that are not equal to the removed key. This effectively removes the key from the set if it exists. We then update the original bucket array with the filtered array.
 *
 * 5. The contains function is used to check if the key is existed on the hash set. This function takes a key as input.
 * - 5.1: We call `getBucketIndex` method to determine the bucket index for the key.
 *
 * - 5.2: We use the includes method on the bucket array to check if the key exists within the bucket. We return `true` if the key is found in the bucket, otherwise `false`.
 *
 * Time complexity: Adding + removing + contains: O(1) on average.
 *
 * Space complexity: O(n + m), where n is the number of unique keys added to the hash set and m is the number of buckets (in this case, 10000).
 *
 */
class MyHashSet {
  constructor() {
    this.capacity = 10000;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  getBucketIndex(key) {
    return key % this.capacity;
  }

  add(key) {
    const bucketIdx = this.getBucketIndex(key);
    this.buckets[bucketIdx].push(key);
  }

  remove(key) {
    const bucketIdx = this.getBucketIndex(key);
    this.buckets[bucketIdx] = this.buckets[bucketIdx].filter(
      (existingKey) => existingKey !== key
    );
  }

  contains(key) {
    const bucketIdx = this.getBucketIndex(key);
    return this.buckets[bucketIdx].includes(key);
  }
}

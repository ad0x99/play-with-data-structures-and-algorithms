/**
 * https://leetcode.com/problems/insert-delete-getrandom-o1/description/
 *
 * Hash Table Approach
 *
 * 1. We initialize a `elements` Map which is used to store elements and their corresponding indices in the keys array. And an `keys` array which stores the actual elements of the set.
 *
 * 2. Insert Function
 * - 2.1: If the value already exists in the set, we return false as duplicates are not allowed.
 *
 * - 2.2: If the value doesn't exist, we set the value as a key in the `elements` map with its corresponding index in the keys array as the value. This allows for fast lookup of an element's position.
 *
 * - 2.3: We push the value to the end of the keys array. Finally, we return true.
 *
 * 3. Remove Function
 * - 3.1: If the value doesn't exist, we return false.
 *
 * - 3.2: If the value exists, we retrieve its corresponding index (`valueToRemoveIdx`) from the `elements` map, and retrieve the last element (`lastElementIdx`) from the keys array.
 *
 * - 3.3: To efficiently remove the element and maintain the order of remaining elements for random access, we use swap the positions of the element to be removed with the current last element in the keys array. This essentially moves the element to be removed to the last position.
 *
 * - 3.4: We then remove the last element (now the element to be removed) from the keys.
 *
 * - 3.5: We update the `elements` map by setting the new index (`valueToRemoveIdx`) of the swapped element (previously the last element) as the value for the key (`keys[valueToRemoveIdx]`). This keeps the map consistent with the updated keys array.
 *
 * - 3.6: Finally, we remove the value from the `elements` map, and return true.
 *
 * 4. GetRandom Function
 * - 4.1: We generate a random index (`randomValue`) within the range of the keys array length.
 *
 * - 4.2: And then, we retrieve the element at the random index (`randomValue`) from the keys array and return it.
 *
 * Time complexity: O(1)
 *
 * Space complexity: O(n)
 */
class RandomizedSet {
  constructor() {
    this.elements = new Map();
    this.keys = [];
  }

  insert(value) {
    if (this.elements.has(value)) return false;

    this.elements.set(value, this.keys.length);
    this.keys.push(value);
    return true;
  }

  remove(value) {
    if (!this.elements.has(value)) return false;

    const valueToRemoveIdx = this.elements.get(value);
    const lastElementIdx = this.keys.length - 1;

    [[this.keys[lastElementIdx], this.keys[valueToRemoveIdx]]] = [
      [this.keys[valueToRemoveIdx], this.keys[lastElementIdx]],
    ];
    this.keys.pop();

    this.elements.set(this.keys[valueToRemoveIdx], valueToRemoveIdx);
    this.elements.delete(value);

    return true;
  }

  getRandom() {
    const randomValue = Math.floor(Math.random() * this.keys.length);
    return this.keys[randomValue];
  }
}

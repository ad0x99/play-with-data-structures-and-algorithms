/**
 * The function calculates a hash value for a given key using a specified length.
 *
 * @param key - The `key` parameter is a string representing the key that needs to be hashed.
 * It is used to calculate the hash value.
 * @param length - The `length` parameter represents the length or size of the hash table or
 * hash map. It determines the number of slots or buckets available for storing data.
 * @returns the value of the variable "total".
 */
export const hash = (key, length) => {
  let total = 0;
  /**
   * Prime numbers will increase the chance of creating unique values when hashing by multiplying values by the prime number
   * It's also helpful if the array that you're putting values into has a prime length
   */
  let weirdPrime = 31;

  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * weirdPrime + value) % length;
    // console.log(`char: ${char} - value: ${value} - total: ${total}`);
  }

  return total;
};

// console.log(hash('pink', 10));
// console.log(hash('orange', 10));
// console.log(hash('cyan', 10));

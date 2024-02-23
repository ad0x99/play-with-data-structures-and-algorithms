/**
 * [Linear Search](https://www.geeksforgeeks.org/linear-search/)
 * This function accepts an array and a value, then loop through the array and check if the current element is equal to the value
 * If it is, return the index at which the element is found, otherwise return -1
 */

/**
 * Challenge
 * Write a function called **linearSearch** which accepts an array and a value, and returns the index at which the value exists. If the value does not exist in the array, return -1.
 */

/**
 * The function performs a linear search for a given value in an array and returns the index of the
 * value if found, otherwise returns -1.
 * @param array - an array of values to search through
 * @param value - The value parameter in the linearSearch function is the value that we are searching
 * for in the array. The function will return the index of the first occurrence of this value in the
 * array, or -1 if the value is not found in the array.
 * @returns The function `linearSearch` returns the index of the first occurrence of the `value` in the
 * `array`. If the `value` is not found in the `array`, it returns `-1`.
 */
const linearSearch = (array, value) => {
  if (!array.length) return -1;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }

  return -1;
};

console.log(linearSearch([10, 15, 20, 25, 30], 15)); // 1
console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4)); // 5
console.log(linearSearch([100], 100)); // 0
console.log(linearSearch([1, 2, 3, 4, 5], 6)); // -1
console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10)); // -1
console.log(linearSearch([100], 200)); // -1

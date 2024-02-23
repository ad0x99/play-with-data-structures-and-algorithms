/**
 * Implement a function called **countUniqueValues** which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted
 */

/**
 * The function counts the number of unique values in an array.
 * @param array - The input array of numbers for which we want to count the number of unique values.
 * @returns The function `countUniqueValues` returns the number of unique values in the input array.
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
const countUniqueValues = (array) => {
  if (!array.length) return 0;

  let i = 0;

  for (let j = 1; j < array.length; j++) {
    if (array[i] !== array[j]) {
      i++;
      array[i] = array[j];
    }
  }

  return i + 1;
};

console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4

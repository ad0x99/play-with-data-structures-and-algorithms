/**
 * Given a **sorted** array of integers, write a function called **search**, that accepts a value and returns the index where the value passed to the function is located.
 * If the value is not found, return -1
 */

/**
 * The function searches for a given value in an array and returns its index if found, otherwise
 * returns -1.
 * @param array - an array of values to search through
 * @param value - The value parameter in the search function is the value that we are searching for in
 * the array. It is the element that we want to find the index of in the array.
 * @returns If the value is found in the array, the function will return the index of the first
 * occurrence of the value. If the value is not found in the array, the function will return -1.
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
const searchNAIVE = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }

  return -1;
};

console.log(searchNAIVE([1, 2, 3, 4, 5, 6], 4)); // 3
console.log(searchNAIVE([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(searchNAIVE([1, 2, 3, 4, 5, 6], 11)); // -1

/**
 * The function performs a binary search on a given array to find a specific value and returns its
 * index or -1 if it is not found.
 * @param array - an array of sorted values to search through
 * @param value - The value parameter is the element that we are searching for in the array using
 * binary search.
 * @returns The function `searchWithBinarySearch` returns the index of the `value` in the `array` if it
 * is found, or `-1` if it is not found.
 * Time complexity: log(n)
 * Space complexity: O(1)
 */
const searchWithBinarySearch = (array, value) => {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);

    if (array[middle] < value) {
      min = middle + 1;
    } else if (array[middle] > value) {
      max = middle - 1;
    } else {
      return middle;
    }
  }

  return -1;
};

console.log(searchWithBinarySearch([1, 2, 3, 4, 5, 6], 4)); // 3
console.log(searchWithBinarySearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(searchWithBinarySearch([1, 2, 3, 4, 5, 6], 11)); // -1

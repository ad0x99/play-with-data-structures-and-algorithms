/**
 * Write a function called **sumZero** which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.
 */

/**
 * The function finds the first pair of numbers in an array that add up to zero and returns them in an
 * array.
 * @param array - The parameter `array` is an array of numbers.
 * @returns The function `sumZero` returns an array containing two elements that add up to zero.
 * Specifically, it returns an array containing the first two elements in the input array that add up
 * to zero. If no such pair exists, the function returns undefined.
 * Time complexity: O(n^2)
 * Space complexity: O(1)
 * This is NAIVE approach
 */
const sumZero = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === 0) {
        return [array[i], array[j]];
      }
    }
  }
};

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])); // [-3, 3]
console.log(sumZero([-2, 0, 1, 3])); // undefined
console.log(sumZero([1, 2, 3])); // undefined

/**
 * The function finds the first pair of numbers in a sorted array that add up to zero using a
 * two-pointer approach.
 * @param array - The input array of integers that we are searching for a pair of elements that sum up
 * to zero.
 * @returns An array containing two elements that add up to zero, or undefined if no such pair exists
 * in the input array.
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
const sumZero2 = (array) => {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    let sum = array[left] + array[right];

    if (sum === 0) {
      return [array[left], array[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
};

console.log(sumZero2([-3, -2, -1, 0, 1, 2, 3])); // [-3, 3]
console.log(sumZero2([-2, 0, 1, 3])); // undefined
console.log(sumZero2([1, 2, 3])); // undefined

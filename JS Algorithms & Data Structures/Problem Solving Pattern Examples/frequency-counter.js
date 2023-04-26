/**
 * Write a function called **same**, which accepts 2
 * arrays. The function should return true if every
 * value in the array has it's corresponding value
 * squared in the second array
 * The frequency of values must be the same
 */

/**
 * Example:
 * same([1, 2, 3], [4, 1, 9]) => true)
 * same([1, 2, 3], [1, 9]) => false)
 * same([1, 2, 1], [4, 4, 1]) => false (must be same frequency))
 */

/**
 * The function checks if two arrays have the same values, with the second array containing the squares
 * of the values in the first array.
 * @param firstArray - The first array to compare. It is assumed that each element in this array will
 * have a corresponding element in the second array that is the square of the first element.
 * @param secondArray - The second parameter of the `same` function is `secondArray`, which is expected
 * to be an array.
 * @returns The function `same` is returning a boolean value (`true` or `false`) depending on whether
 * the second array contains the square of each element in the first array in any order.
 * Time Complexity: O(N^2)
 * This is NAIVE approach
 */
const sameWithNAIVEApproach = (firstArray, secondArray) => {
  if (firstArray.length !== secondArray.length) return false;

  for (let i = 0; i < firstArray.length; i++) {
    let correctIndex = secondArray.indexOf(firstArray[i] ** 2);

    if (correctIndex === -1) return false;

    secondArray.splice(correctIndex, 1);
  }

  return true;
};

/* The expected output for these calls are `true`, `false`, and `false` respectively. */
console.time('sameWithNAIVEApproach');
console.log(sameWithNAIVEApproach([1, 2, 3], [4, 1, 9]));
console.log(sameWithNAIVEApproach([1, 2, 3], [1, 9]));
console.log(sameWithNAIVEApproach([1, 2, 1], [4, 4, 1]));
console.timeEnd('sameWithNAIVEApproach');

/**
 * The function checks if two arrays have the same frequency of squared values.
 * @param firstArray - The first array to compare.
 * @param secondArray - The second array to compare
 * @returns The function `sameBestApproach` is returning a boolean value (`true` or `false`). It
 * returns `true` if the second array contains the squares of every value in the first array with the
 * same frequency, and `false` otherwise.
 * Time complexity: O(n)
 */
const sameBestApproach = (firstArray, secondArray) => {
  if (firstArray.length !== secondArray.length) return false;

  let frequencyCounter1 = {};
  let frequencyCounter2 = {};

  for (let value of firstArray) {
    frequencyCounter1[value] = (frequencyCounter1[value] || 0) + 1;
  }

  for (let value of secondArray) {
    frequencyCounter2[value] = (frequencyCounter2[value] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }

    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }

  return true;
};

/* The expected output for these calls are `true`, `false`, and `false` respectively. */
console.time('sameBestApproach');
console.log(sameBestApproach([1, 2, 3], [4, 1, 9]));
console.log(sameBestApproach([1, 2, 3], [1, 9]));
console.log(sameBestApproach([1, 2, 1], [4, 4, 1]));
console.timeEnd('sameBestApproach');

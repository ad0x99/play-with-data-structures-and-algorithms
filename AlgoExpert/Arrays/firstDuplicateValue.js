/**
 * QUESTION
 *
 * Given an array of integers between 1 and n, inclusive, where n is the length of the array, write a function that returns the first integer that appears more than once (when the array is read from left to right).
 *
 * In other words, out of all the integers that might occur more than once in the input array, your function should return the one whose first duplicate value has the minimum index.
 *
 * If no integer appears more than once, your function should return -1
 *
 * Note that you're allowed to mutate the input array.
 *
 * Sample Input #1:
 * array = [2, 1, 5, 2, 3, 3, 4]
 *
 * Sample Output #1:
 * 2 // 2 is the first integer that appears more than once
 * // 3 also appears more than once, but the second 3 appears after the second 2.
 *
 * Sample Input #2:
 * array = [2, 1, 5, 3, 3, 2, 4]
 *
 * Sample Output #2:
 * 3 // 3 is the first integer that appears more than once
 * // 2 also appears more than once, but the second 2 appears after the second 3.
 *
 */

/**
 * SOLUTION 1
 *
 * The time complexity of the this function is O(n^2) because it has two nested loops, one iterating over the array and the other iterating over the remaining elements in the array. This results in a quadratic time complexity as the number of operations grows quadratically with the size of the input array.
 *
 * The space complexity of this function is O(1) because it only uses a constant amount of extra space regardless of the size of the input array.
 */
const firstDuplicateValueBruteForce = (array) => {
  // We initialize initial value of minimum index  equal to length of the array
  // Because in case the final minimum index is equal to the length of the array, then we know that there is no duplicate in the array
  let minIndex = array.length;

  // We loop through the array
  // And compare if the first integer is equal to the second integer
  // That means we found the duplicate
  // Then we'll update the minimum index and continue with remaining indices
  for (let i = 0; i < array.length; i++) {
    let currentFirst = array[i];

    for (let j = i + 1; j < array.length; j++) {
      let currentSecond = array[j];

      if (currentFirst === currentSecond) {
        minIndex = Math.min(minIndex, j);
      }
    }
  }

  // If the minimum index is equal to the length of the array
  // That means there is no duplicate in the array
  if (minIndex === array.length) return -1;

  // Otherwise, return the first duplicate value
  return array[minIndex];
};

const array1 = [2, 1, 5, 2, 3, 3, 4];
const array2 = [2, 1, 5, 3, 3, 2, 4];
const array3 = [1, 1, 2, 3, 3, 2, 2];
const array4 = [3, 1, 3, 1, 1, 4, 4];
const array5 = [];
const array6 = [1];
const array7 = [1, 1];
const array8 = [
  23, 21, 22, 5, 3, 13, 11, 16, 5, 11, 9, 14, 23, 3, 2, 2, 5, 11, 6, 11, 23, 8,
  1,
];
const array9 = [9, 13, 6, 2, 3, 5, 5, 5, 3, 2, 2, 2, 2, 4, 3];
const array10 = [7, 6, 5, 3, 6, 4, 3, 5, 2];
console.log(firstDuplicateValueBruteForce(array1)); // 2
console.log(firstDuplicateValueBruteForce(array2)); // 3
console.log(firstDuplicateValueBruteForce(array3)); // 1
console.log(firstDuplicateValueBruteForce(array4)); // 3
console.log(firstDuplicateValueBruteForce(array5)); // -1
console.log(firstDuplicateValueBruteForce(array6)); // -1
console.log(firstDuplicateValueBruteForce(array7)); // 1
console.log(firstDuplicateValueBruteForce(array8)); // 5
console.log(firstDuplicateValueBruteForce(array9)); // 5
console.log(firstDuplicateValueBruteForce(array10)); // 6

/**
 * SOLUTION 2
 *
 * The time complexity of this solution is O(n) where n is the number of elements in the input array. This is because we iterate through the array once to check for duplicate values.
 *
 * The space complexity is also O(n) in the worst case scenario where all elements in the array are unique and there are no duplicates. This is because we use a set to keep track of visited values, and the set can potentially store all elements in the array.
 */
const firstDuplicateValueUsingSet = (array) => {
  // We create a set to keep track of visited value
  let seen = new Set();

  // Iterate through the array
  for (let i = 0; i < array.length; i++) {
    let current = array[i];

    // If the current value is already in the set
    // That means we found the duplication value
    if (seen.has(current)) {
      return current;
    }

    // Otherwise, the current value has not been visited
    // Then we add it to the set
    seen.add(current);
  }

  // If there is no duplicate value, return -1
  return -1;
};
console.log(firstDuplicateValueUsingSet(array1)); // 2
console.log(firstDuplicateValueUsingSet(array2)); // 3
console.log(firstDuplicateValueUsingSet(array3)); // 1
console.log(firstDuplicateValueUsingSet(array4)); // 3
console.log(firstDuplicateValueUsingSet(array5)); // -1
console.log(firstDuplicateValueUsingSet(array6)); // -1
console.log(firstDuplicateValueUsingSet(array7)); // 1
console.log(firstDuplicateValueUsingSet(array8)); // 5
console.log(firstDuplicateValueUsingSet(array9)); // 5
console.log(firstDuplicateValueUsingSet(array10)); // 6

/**
 * SOLUTION 3
 *
 * The question allows us the mutable input array and all of the integers are in the range of 1 to n, then we can leverage this condition to mutate the input array and check the duplicate in the same time we loop through the array once. This will help us reducing the space complexity from O(n) to O(1) because we reuse the input array for storing, therefore, there no need additional array for storing the integers
 *
 * The time complexity of this function is O(n) because it iterates through the input array once, where n is the number of elements in the array.
 *
 * The space complexity is O(1) because the function mutates the input array in place and does not use any additional data structures that grow with the input size.
 *
 */
const firstDuplicateValueByMutatingTheInputArray = (array) => {
  // The idea is to found 2 integers that when its index subtract by 1 is pointing to the same negative value (because each time we iterate through, we update the visited value to a negative value, therefore, If it's negative, that means we revisit the same value). That means, we found the duplicate value
  // Iterate through the entire array
  for (const value of array) {
    // We get the absolute value because it might be changed to negative later on
    let currentAbsVal = Math.abs(value);
    let currentIndex = array[currentAbsVal - 1];

    // If the current index is less than zero (it means we're pointing to the same negative number or visited value)
    // That means we found the duplicate value
    if (currentIndex < 0) {
      return currentAbsVal;
    }

    // Otherwise, we'll set the current value to a negative by multiplying with -1
    array[currentAbsVal - 1] *= -1;
  }

  // If there is no duplicate value, return -1
  return -1;
};
console.log(firstDuplicateValueByMutatingTheInputArray(array1)); // 2
console.log(firstDuplicateValueByMutatingTheInputArray(array2)); // 3
console.log(firstDuplicateValueByMutatingTheInputArray(array3)); // 1
console.log(firstDuplicateValueByMutatingTheInputArray(array4)); // 3
console.log(firstDuplicateValueByMutatingTheInputArray(array5)); // -1
console.log(firstDuplicateValueByMutatingTheInputArray(array6)); // -1
console.log(firstDuplicateValueByMutatingTheInputArray(array7)); // 1
console.log(firstDuplicateValueByMutatingTheInputArray(array8)); // 5
console.log(firstDuplicateValueByMutatingTheInputArray(array9)); // 5
console.log(firstDuplicateValueByMutatingTheInputArray(array10)); // 6

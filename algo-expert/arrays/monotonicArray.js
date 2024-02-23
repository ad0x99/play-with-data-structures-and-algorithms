/**
 * QUESTION
 *
 * Write a function that takes in an array of integers and returns a boolean representing whether the array is monotonic.
 *
 * An array is said to be monotonic if its elements, from left to right, are entirely non-increasing or entirely non-decreasing.
 *
 * Non-increasing elements aren't necessarily exclusively decreasing; they simply don't increase. Similarly, non-decreasing elements are not necessarily exclusively increasing; they simply don't decrease.
 *
 * Note that empty arrays and arrays of one element are not monotonic.
 *
 * Sample Input:
 * array = [-1, -5, -10, -1100, -1101, -1102, -9001]
 *
 * Sample Output:
 * true
 */

/**
 * SOLUTION 1
 * 
 * The time complexity of this function is O(n), where n is the length of the input array. This is because the function iterates through the array once in a for loop, checking the direction of each element and comparing it to the previous element. The number of iterations is directly proportional to the length of the array.

 * The space complexity of this function is O(1), because it only uses a constant amount of additional space to store the direction variable.
 */
const isMonotonic = (array) => {
  // If the length of the array is less than or equal to 2
  // That means the array is monotonic because it's either non-increasing or non-decreasing
  if (array.length <= 2) {
    return true;
  }

  // We pick either non-increasing or non-decreasing direction
  // and then invalidate it to find out which direction the array is
  let direction = array[1] - array[0];

  for (let i = 2; i < array.length; i++) {
    // As long as we could not find the array direction by comparing the first and the second values of the array, we continue to update the direction by comparing the current value and the previous one to find out the direction
    if (direction === 0) {
      direction = array[i] - array[i - 1];
      continue;
    }

    // We found the direction, but the array is broken its direction
    // The we return false
    if (breaksDirection(direction, array[i - 1], array[i])) {
      return false;
    }
  }

  return true;
};

const breaksDirection = (direction, previous, current) => {
  // We find out the difference between current value and previous value
  // to know which direction the array is
  let difference = current - previous;

  // If the direction is greater than 0
  // that means the array could be the non-decreasing
  if (direction > 0) {
    // Then we invalidate the opposite difference to catch the break of non-decreasing direction
    // this means the current non-decreasing direction is broke because the current value is less than the previous one
    return difference < 0;
  }

  // Otherwise, we invalidate the difference of non-increasing direction
  return difference > 0;
};

const array = [-1, -5, -10, -1100, -1101, -1102, -9001];
const array2 = [2, 2, 2, 1, 4, 5];
const array3 = [1, 1, 1, 2, 3, 4, 1];
const array4 = [-1, -1, -1, -1, -1, -1, -1, -1];
const array5 = [];
const array6 = [1];
console.log(isMonotonic(array)); // true
console.log(isMonotonic(array2)); // false
console.log(isMonotonic(array3)); // false
console.log(isMonotonic(array4)); // true
console.log(isMonotonic(array5)); // true
console.log(isMonotonic(array6)); // true

/**
 * SOLUTION 2
 * 
 * The time complexity of this function is O(n), where n is the length of the input array. This is because the function iterates through the array once, comparing each element to its previous element.

 * The space complexity of this function is O(1), because it only uses a constant amount of additional space to store the boolean variables isNonDecreasing and isNonIncreasing. The space used does not depend on the size of the input array.
 */
const isMonotonic2 = (array) => {
  // We assume the array is either non-increasing or non-decreasing are always true
  let isNonDecreasing = true;
  let isNonIncreasing = true;

  // As we iterate through the entire array
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let previous = array[i - 1];

    // If the current value is less than the previous one
    // That means the array is not non-decreasing
    // Then we update the isNonDecreasing to false
    if (current < previous) {
      isNonDecreasing = false;
    }

    // If the current value is greater than the previous one
    // That means the array is not non-increasing
    // Then we update the isNonIncreasing to false
    if (current > previous) {
      isNonIncreasing = false;
    }
  }

  // This means if both variables are true
  // Then our array is monotonic
  // And if one of those is false then our array is not monotonic
  return isNonDecreasing || isNonIncreasing;
};

console.log(isMonotonic2(array)); // true
console.log(isMonotonic2(array2)); // false
console.log(isMonotonic2(array3)); // false
console.log(isMonotonic2(array4)); // true
console.log(isMonotonic2(array5)); // true
console.log(isMonotonic2(array6)); // true

/**
 * QUESTION
 *
 * Write a function that takes in a non-empty array of integers that are sorted in ascending order and returns a new array of the same length with the squares of the original integers also sorted in ascending order.
 *
 * Sample Input:
 * array = [1, 2, 3, 5, 6, 9]
 *
 * Sample Output:
 * [1, 4, 9, 25, 36, 64, 81]
 */

/**
 * SOLUTION 1
 * 
 * The time complexity of this function is O(n log n), where n is the length of the input array. This is because the function uses the sort() method, which has a time complexity of O(n log n) in the average case.

 * The space complexity of this function is O(n), where n is the length of the input array. This is because the function creates a new array, squaredInt, to store the squared values of the input integers. The size of this array is directly proportional to the size of the input array.
 */
const isSortedSquaredArrayWithForLoop = (integers) => {
  let squaredInt = [];

  for (const num of integers) {
    squaredInt.push(num ** 2);
  }

  return squaredInt.sort((a, b) => a - b);
};

// console.log(isSortedSquaredArrayWithForLoop([1, 2, 3, 5, 6, 9])); // [1, 4, 9, 25, 36, 64, 81]
// console.log(isSortedSquaredArrayWithForLoop([-2, -1, 1, 3])); // [1, 1, 4, 9]

/**
 * SOLUTION 2
 * 
 * The time complexity of this algorithm is O(n), where n is the length of the input array. This is because we iterate through the array once, performing constant time operations for each element.

 * The space complexity is O(n), as we create a new array of the same length as the input array to store the squared values.
 */
const isSortedSquaredArrayWithTwoPointers = (integers) => {
  // Because the array is sorted, then we can assume that
  // the smallest value will be the leftmost value and the largest value will be the rightmost value
  let smallestIdx = 0;
  let largestIdx = integers.length - 1;

  // We create a new array as the same length as the input array
  // To fill squared value into
  let squaredInt = new Array(integers.length);

  // Loop through the array from the right to left
  for (let i = integers.length - 1; i >= 0; i--) {
    // Get absolute of smallest and largest values
    let currentSmallest = Math.abs(integers[smallestIdx]);
    let currentLargest = Math.abs(integers[largestIdx]);

    // If smallest absolute is greater than largest absolute
    // We add squared of current smallest value and add it to new array
    // After that, we increase the smallest index by 1 (that means move to the next smallest)
    if (currentSmallest > currentLargest) {
      squaredInt[i] = currentSmallest * currentSmallest;
      smallestIdx += 1;
    } else {
      // Otherwise, we add squared of current largest value and add it to new array
      // And decrease the largest index by 1 (that means move to the next largest)
      squaredInt[i] = currentLargest * currentLargest;
      largestIdx -= 1;
    }
  }

  return squaredInt;
};

console.log(isSortedSquaredArrayWithTwoPointers([1, 2, 3, 5, 6, 9])); // [1, 4, 9, 25, 36, 64, 81]
console.log(isSortedSquaredArrayWithTwoPointers([-2, -1, 1, 3])); // [1, 1, 4, 9]

/**
 * QUESTION
 *
 * Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. If any two numbers in the input array sum up to the target sum, the function should return them in an array, in any order. If no two numbers sum up to the target sum, the function should return an empty array.
 * Note that the target sum has to be obtained by summing two different integers in the array; you can't add a single integer to itself in order to obtain the target sum.
 * You can assume that there will be at most one pair of numbers summing up to the target sum.
 *
 * Sample Input:
 * array = [3, 5, -4, 8, 11, 1, -1, 6]
 * targetSum = 10
 * Sample Output:
 * [-1, 11] // The numbers could be in reverse order
 */

/**
 * SOLUTION 1
 *
 * Time complexity: `O(n)` - The time complexity of this function is O(n), where n is the length of the input array. This is because the function iterates through the array once in a for loop.
 * Space complexity: `O(n)` - The space complexity of this function is O(n), where n is the length of the input array. This is because the function creates a temporary object to store the numbers from the array, and the size of this object will grow linearly with the size of the input array.
 */
const twoNumberSumWithHashmap = (array, targetSum) => {
  // Create a hashmap to keep track of iterated number
  let temp = {};

  for (const num of array) {
    // Find the pair of sums by calculating the difference between targetSum and the current number
    // Assume that x + y = targetSum => y = targetSum - x
    const calculation = targetSum - num;

    // If the calculation is iterated before
    // Then we found a pair of numbers summing up to the target
    if (temp[calculation]) {
      return [temp[calculation], num];
    }

    // Otherwise, add current num to the hashmap
    temp[num] = num;
  }

  return [];
};

console.log(twoNumberSumWithHashmap([14], 15)); // []
console.log(twoNumberSumWithHashmap([15], 15)); // []
console.log(twoNumberSumWithHashmap([3, 5, -4, 8, 11, 1, -1, 6], 10)); // [-1, 11]
console.log(
  twoNumberSumWithHashmap([-21, 301, 12, 4, 65, 56, 210, 356, 9, -47], 164)
); // []
console.log(
  twoNumberSumWithHashmap([-21, 301, 12, 4, 65, 56, 210, 356, 9, -47], 163)
); // [-47, 210]
console.log(twoNumberSumWithHashmap([-7, -5, -3, -1, 0, 1, 3, 5, 7], -5)); // [0, -5]

/**
 * SOLUTION 2
 * 
 * The time complexity of this algorithm is O(n log n), where n is the length of the input array. This is because the algorithm first sorts the array, which has a time complexity of O(n log n) in the worst case. Then, it uses two pointers to iterate through the sorted array, which takes O(n) time in the worst case. Therefore, the overall time complexity is dominated by the sorting step.

 * The space complexity of this algorithm is O(1) because it only uses a constant amount of extra space to store the left and right pointers. The input array is sorted in place, so no additional space is required.
 */
const twoNumberSumWithTwoPointers = (array, targetSum) => {
  // Sort the array in ascending order
  const sortedArray = array.sort((a, b) => a - b);
  let left = 0; // first element of the array
  let right = sortedArray.length - 1; // last element of the array

  while (left < right) {
    // Get sum of current calculation between the left value and right value
    let currentSum = sortedArray[left] + sortedArray[right];

    if (currentSum === targetSum) {
      return [sortedArray[right], sortedArray[left]];
    } else if (currentSum < targetSum) {
      // currentSum < targetSum means that we need to increase the left pointer
      // to get the higher sum, since the array is sorted
      left += 1;
    } else if (currentSum > targetSum) {
      // currentSum > targetSum means that we need to decrease the right pointer
      // to get the lower sum, since the array is sorted
      right -= 1;
    }
  }

  return [];
};

console.log(twoNumberSumWithTwoPointers([14], 15)); // []
console.log(twoNumberSumWithTwoPointers([15], 15)); // []
console.log(twoNumberSumWithTwoPointers([3, 5, -4, 8, 11, 1, -1, 6], 10)); // [-1, 11]
console.log(
  twoNumberSumWithTwoPointers([-21, 301, 12, 4, 65, 56, 210, 356, 9, -47], 164)
); // []
console.log(
  twoNumberSumWithTwoPointers([-21, 301, 12, 4, 65, 56, 210, 356, 9, -47], 163)
); // [-47, 210]
console.log(twoNumberSumWithTwoPointers([-7, -5, -3, -1, 0, 1, 3, 5, 7], -5)); // [0, -5]

/**
 * SOLUTION 3
 * 
 * The time complexity of this function is O(n^2) because it uses two nested loops. The outer loop iterates through the array once, and for each iteration, the inner loop iterates through the remaining elements of the array. This results in a total of n * (n-1) iterations, which simplifies to O(n^2) in big O notation.

 * The space complexity of this function is O(1) because it only uses a constant amount of additional space. The variables first, second, and sum are reused in each iteration of the loops, and the returned array also has a constant length of 2. Therefore, the space used by the function does not depend on the size of the input array.
 */
const twoNumberSumWithNestedLoop = (array, targetSum) => {
  let first, second, sum;

  for (let i = 0; i < array.length - 1; i++) {
    first = array[i];

    for (let j = i + 1; j < array.length; j++) {
      second = array[j];
      sum = first + second;

      if (sum === targetSum) {
        return [first, second];
      }
    }
  }

  return [];
};

console.log(twoNumberSumWithNestedLoop([14], 15)); // []
console.log(twoNumberSumWithNestedLoop([15], 15)); // []
console.log(twoNumberSumWithNestedLoop([3, 5, -4, 8, 11, 1, -1, 6], 10)); // [-1, 11]
console.log(
  twoNumberSumWithNestedLoop([-21, 301, 12, 4, 65, 56, 210, 356, 9, -47], 164)
); // []
console.log(
  twoNumberSumWithNestedLoop([-21, 301, 12, 4, 65, 56, 210, 356, 9, -47], 163)
); // [-47, 210]
console.log(twoNumberSumWithNestedLoop([-7, -5, -3, -1, 0, 1, 3, 5, 7], -5)); // [0, -5]

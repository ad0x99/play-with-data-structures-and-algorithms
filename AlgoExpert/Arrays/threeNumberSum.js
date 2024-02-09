/**
 * QUESTION
 *
 * Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all triplets in the array that sum up to the target sum and return a two-dimensional array of all these triplets. The numbers in each triplet should be ordered in ascending order, and the triplets themselves should be ordered in ascending order with respect to the numbers they holds.
 *
 * If no three numbers sum up to the target sum, the function should return an empty array.
 *
 * Sample Input:
 * array = [12, 3, 1, 2, -6, 5, -8, 6]
 * targetSum = 0
 *
 * Sample Output:
 * [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
 */

/**
 * SOLUTION 
 * 
 * The time complexity of this algorithm is O(n^2), where n is the length of the input array. This is because we have a nested loop, where the outer loop iterates n-2 times and the inner loop iterates n-1 times in the worst case. Therefore, the total number of iterations is (n-2) * (n-1) = n^2 - 3n + 2, which is approximately O(n^2).

 * The space complexity of this algorithm is O(1), because we are not using any additional data structures that grow with the input size. The triplets array is used to store the output, but its size is limited to the number of triplets that satisfy the target sum, which is not dependent on the input size.
 */
const threeNumberSum = (array, targetSum) => {
  // Sort the array in ascending order
  const sortedArray = array.sort((a, b) => a - b);
  let triplets = [];

  // We've got sortedArray.length - 2 because we need to have 3 pointers
  // Then that means we should have at least 3 values in the array
  for (let i = 0; i < sortedArray.length - 2; i++) {
    let left = i + 1;
    let right = sortedArray.length - 1;

    while (left < right) {
      let currentNumber = sortedArray[i];
      let currentLeft = sortedArray[left];
      let currentRight = sortedArray[right];
      // currentSum = currentNumber + left + right
      let currentSum = currentNumber + currentLeft + currentRight;

      // If we found a sum of triplet that match the targetSum
      if (currentSum === targetSum) {
        // We add the triplet to the triplets array
        triplets.push([currentNumber, currentLeft, currentRight]);

        // And then, we increase the left pointer by 1 and decrease the right pointer by 1
        // Because currentLeft and currentRight are already in the triplet,
        // We should move to the next value to keep finding the next triplet
        left += 1;
        right -= 1;
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
  }

  return triplets;
};

const array = [12, 3, 1, 2, -6, 5, -8, 6];
const targetSum = 0;
console.log(threeNumberSum(array, targetSum)); // [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]

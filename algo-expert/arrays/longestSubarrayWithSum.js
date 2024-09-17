/**
 * Write a function that takes in a non-empty array of non-negative integers and a non-negative integer representing a target sum. The function should find the longest subarray where the values collectively sum up to equal the target sum. Return an array containing the starting index and ending index of this subarray, both inclusive.
 *
 * If there is no subarray that sums up to the target sum, the function should return an empty array. You can assume that the given inputs will only ever have one answer.
 *
 * Sample Input:
 * array = [1, 2, 3, 4, 3, 3, 1, 2, 1, 2]
 * targetSum = 10
 *
 * Sample Output:
 * [4, 8] // the longest subarray that sums to 10 starts at index 4 and ends at index 8
 */

/**
 * Brute Force Approach: The idea is to iterate through each subarray and calculate the sum of each subarray until we found the subarray that has the sum is equal to the target sum.
 *
 * 1. We initialize a indices array to contain the result.
 * 2. We use 2 pointers to iterate through the array which are a left, and a right pointers.
 * 3. We initialize a variable to keep track the current sum of specific subarray which is called currentSubarraySum.
 * 4. Inside the loop, at first, we calculate the sum of the current number with the current subarray sum.
 * 5. If we found a subarray that its sum is equal to the target sum
 * 6. And if there is no element in indices array or the current subarray is the new longest subarray that has the sum is equal to the target sum, we update the indices array.
 * 7. Otherwise, we keep iterate through each subarray and return empty array if there is no valid subarray found
 *
 * Time complexity: O(n^2)
 *
 * Space complexity: O(1)
 */
const longestSubarrayWithSumBruteForce = (array, targetSum) => {
  let indices = [];

  for (let left = 0; left < array.length; left++) {
    let currentSubarraySum = 0;

    for (let right = left; right < array.length; right++) {
      currentSubarraySum += array[right];

      if (currentSubarraySum === targetSum) {
        let isNewLongestSubarray = indices[1] - indices[0] < right - left;

        if (!indices.length || isNewLongestSubarray) {
          indices = [left, right];
        }
      }
    }
  }

  return indices;
};

/**
 * The idea is the same as above example, the only difference is we'll not re-calculate the calculated sum in the previous subarray.
 *
 * Analyze the problem:
 *
 * array = [1, 2, 3, 4, 3, 3, 1, 2, 1, 2], targetSum = 10
 *
 * In this example, the first valid subarray we could find is [1, 2, 3, 4], then, we update the indices.
 *
 * If we continue to calculate the current subarray sum with the next number 3, the subarray will be [1, 2, 3, 4, 3], then the current sum will be greater than the target sum.
 *
 * In this case, we're going to remove the left pointer (at the index of 0 - [1]) from the subarray, because the current subarray that starts from index of 0 is no longer valid, we have to move to the next subarray that starts from index of 1 - [2].
 *
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(1)
 */
const longestSubarrayWithSum = (array, targetSum) => {
  let indices = [];
  let currentSubarraySum = 0;
  let left = 0;
  let right = 0;

  while (right < array.length) {
    currentSubarraySum += array[right];

    // If we still in the current subarray, and the current subarray sum is greater than the target sum
    // We remove the current left pointer from the current subarray
    // And we increase the left pointer to move to the next potential subarray
    while (left < right && currentSubarraySum > targetSum) {
      currentSubarraySum -= array[left];
      left += 1;
    }

    if (currentSubarraySum === targetSum) {
      let isNewLongestSubarray = indices[1] - indices[0] < right - left;

      if (!indices.length || isNewLongestSubarray) {
        indices = [left, right];
      }
    }

    right += 1;
  }

  return indices;
};

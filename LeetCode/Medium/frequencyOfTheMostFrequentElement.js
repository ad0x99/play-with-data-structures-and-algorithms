/**
 * https://leetcode.com/problems/frequency-of-the-most-frequent-element/description/
 *
 * The idea is to modify all the previous number of the current number, such that the previous numbers will be equal to the current number. Because we want to make the more previous numbers equal to the current number, the longer frequency we have.
 *
 * For example : nums = [1, 2, 6, 6, 7], k = 2, output: 3
 *                       j           i
 *
 * Because we want to find the longest frequency of a number, we need to use the number of operations to modify the previous numbers such that the previous numbers will be equal to the current number.
 *
 * If the nums runs from j to i, then the frequency of the current number i will be equal to the number of operations plus with all the previous numbers (j to i) such that the previous numbers will be equal to the current number i.
 *
 * In this case, we have 2 operations, we add one operation for 6 at the position 2 and one operation for 6 at the position 3 => we have 2 numbers 7 => now we have 3 number of 7 in the nums => the longest frequency = 3 (7, 7, 7).
 *
 * We notice that if the nums is sorted. The closer i and j are, the less operation we have to take and vice versa. The closest number of i will be in the left side of i. Therefore, we want to modify the closest number of i first by moving to the left side as long as the modified number is equal to the current number and the number of operations is less than or equal to the k operations. Otherwise, we'll move to the right side.
 *
 * In order to calculate how much operations do we need to modify between i to j, we need to calculate the prefix sum of all the numbers.
 *
 * number of operations from j to i = `current value at i times the length of j to j - prefixSum from j to i`
 *
 * => number of operations from j to i = `i * (i - j + 1) - prefixSum(j, i)`
 *
 * Implementation:
 *
 * 1. We sort the array nums in ascending order.
 * 2. We build a prefix sum array by calculating the sum of the numbers in the array.
 * 3. We iterate through the array from 0 to nums.length, and search for the smallest distance such that we have enough operations to modify and form frequency number.
 * 4. We use a binary search function to find the smallest distance. We count the number of needed operations for specific range. If the number of operations is less than or equal to the input operations, we update the result of ans variable and keep moving to the left to find the next possible frequency. Otherwise, we find in the right side.
 * 5. After the we get the frequency of the current number, we update the ans variable by getting the maximum value. Because we want to find the maximum possible frequency.
 *
 *
 * Time complexity: O(n) + O(n) * O(log n) = O(n log n)
 * - Calculate the prefix sum: O(n)
 * - Calculate to find the maximum of frequency: O(n)
 * - Find smallest index that has enough operations to form a frequency: O(n log n)
 *
 * Space complexity: O(n) - because we sort the array nums.
 *
 */
const maxFrequency = (nums, k) => {
  // Function to calculate sum within a range
  function getSum(left, right) {
    return preSum[right + 1] - preSum[left];
  }

  // Function to find the smallest index with enough operations
  function searchSmallestIndexEnoughOperations(i) {
    let left = 0;
    let right = i;
    let ans = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2); // Use Math.floor for integer division
      const cntOperationNeeded = nums[i] * (i - mid + 1) - getSum(mid, i);

      if (cntOperationNeeded <= k) {
        ans = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return ans;
  }

  // Sort the nums array
  nums.sort((a, b) => a - b);

  const n = nums.length;
  const preSum = new Array(n + 1).fill(0); // Initialize preSum with zeros

  // Build the prefix sum array
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    const j = searchSmallestIndexEnoughOperations(i);
    ans = Math.max(ans, i - j + 1); // Use Math.max for finding maximum
  }

  return ans;
};

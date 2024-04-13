/**
 * https://leetcode.com/problems/longest-increasing-subsequence/description/
 *
 * Dynamic Programming Approach: An increasing subsequence is a sequence where each element is greater than the one before it. The idea is as long as there are elements that are greater than the one before it, we calculate its length.
 *
 * 1. We create a array which is called dp to store the lengths of the LIS ending at each index in the nums array.
 * 2. The outer loop iterates through each element nums[i] in the nums array. For each element, we will check if it can extend an existing LIS.
 * 3. The inner loop iterates through all elements before the current element i (0 to i-1), and we compare the elements at indices i and j to see if they can form an increasing subsequence.
 * - 3.1: If `nums[j] < nums[i]`: This ensures the element at index j is strictly less than the element at index i.
 * - 3.1: And if `dp[i] < dp[j] + 1`: This checks if the length of the LIS ending at index i is less than the length of the LIS ending at index j plus 1.
 * - 3.2: If both conditions are true, it means we can potentially extend the LIS ending at index j by including the element nums[i]. Therefore, the value in dp[i] is updated to dp[j] + 1, representing the new length of the LIS ending at index i.
 * 4. After iterating through all elements, the dp array holds the lengths of the LIS ending at each index. The Math.max(...dp) function finds the maximum value in the dp array, which represents the length of the longest increasing subsequence in the original nums array.
 *
 * Time complexity: O(n^2) - because we have nested-loop to find the LIS
 *
 * Space complexity: O(n) - where n is the length of the dp array.
 */
const lengthOfLISWithDynamicProgramming = (nums) => {
  let dp = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1;
      }
    }
  }

  return Math.max(...dp);
};

/**
 * Binary Search Approach: The idea is each time we iterate through the nums array, we'll build a as long subsequence as possible.
 *
 * 1. We create an empty array subsequence to store the elements of the LIS being built.
 * 2. We iterate through each element num in the nums array.
 * 3. There are 2 conditions we need to check here are:
 * - 3.1: If subsequence.length === 0: If subsequence is empty, any element can be added as the first element of the LIS.
 * - 3.2: Or if num > subsequence[subsequence.length - 1]: This checks if the current num is greater than the last element in subsequence. If so, it can be directly appended as a new increasing element.
 * - 3.3: If either of the above conditions is true, it means the current num represents a new maximum element for the current LIS. Therefore, num is appended to the subsequence array.
 * 4. If neither condition is true, it means the current num cannot be directly appended while maintaining the increasing order. We need to find the appropriate position to insert num in subsequence.
 * - 4.1: The lowerBound function is used to find the index in subsequence of the first element that is greater than or equal to the current num.
 * - 4.2: The index (idx) obtained from lowerBound indicates the position where the existing element in subsequence should be replaced with num. This ensures the increasing order is maintained. Then, the element at idx in subsequence is then replaced with the current num.
 * 5. After iterating through all elements, the subsequence array holds the constructed LIS. The final return subsequence.length provides the length of the LIS.
 *
 * Time complexity: O(n * log(n)) - because we iterate through each element of nums and do the binary search for finding the index in subsequence of the first element that is greater than or equal to the current num.
 *
 * Space complexity: O(n) - where n is the length of the subsequence array
 */
const lengthOfLIS = (nums) => {
  const subsequence = [];

  for (const num of nums) {
    if (subsequence.length === 0 || num > subsequence[subsequence.length - 1]) {
      subsequence.push(num);
    } else {
      let idx = lowerBound(subsequence, num);
      subsequence[idx] = num;
    }
  }

  return subsequence.length;
};

/**
 * Find the first element that is greater than or equal to the target
 */
const lowerBound = (subsequence, num) => {
  let left = 0;
  let right = subsequence.length - 1;
  let ans = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (subsequence[mid] >= num) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
};

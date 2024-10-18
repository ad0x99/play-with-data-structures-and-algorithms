/**
 * https://leetcode.com/problems/continuous-subarray-sum/description/
 *
 * Hash Table + Prefix Sum Approach
 *
 * Idea: We can notice that when the sum of a subarray is divisible by k, the remainder after dividing the sum by k will always be 0.
 *
 * ```js
 * For example: [23,2,4,6,7], k = 6
 *
 * The qualified subarray in this case is [2, 4] => sum = 6 => remainder = 6 % 6 = 0
 * ```
 *
 * By calculating the remainder (prefixSum % k) of the current cumulative sum (prefixSum), we essentially track how close we are to a sum divisible by k
 *
 * Storing the remainder and its corresponding ending index (i) in the visitedRemainder map allows us to check if a previous subarray with the same remainder exists.
 *
 * If we encounter a remainder that already exists in the map, it indicates that a previous subarray ending at a certain index also has the same remainder.
 *
 * By subtracting the ending index of the previous subarray with the same remainder from the current index, we can calculate the length of the current subarray that leads to the same remainder.
 *
 * If the current subarray has a length greater than 1 and the remainder is 0 (meaning the cumulative sum is divisible by k), we've found a qualifying subarray.
 *
 * If the current subarray has a length greater than 1 and the remainder from a previous subarray with the same remainder also exists, it implies that the sum of the current subarray combined with the previous subarray would be divisible by k.
 *
 * Implementation:
 *
 * 1. We create a Map called `visitedRemainder` to store remainders and their corresponding ending indices in the array. And we initialize a initial key-value pair: {0: -1} to represent in case an subarray (with sum 0). This is used for handling the edge case where the entire array might have a sum divisible by k.
 *
 * 2. We initialize a variable `prefixSum` to 0 to keep track of the cumulative sum.
 *
 * 3. Inside the loop, we calculate the current sum by adding the current number (nums[i]) to the previous sum. And we then calculate the remainder by performing `prefixSum % k`. This represents the remainder after dividing the cumulative sum by the target k.
 *
 * 4. We check if the current remainder already exists in the visitedRemainder map.
 * - 4.1: If the remainder doesn't exist, this means there isn't a previously encountered subarray with the same remainder. We then set the current remainder as a key with the current index (i) as the value into the visitedRemainder map. This stores the ending index of the current subarray that leads to the encountered remainder.
 *
 * - 4.2: If the remainder exists which indicates that a previous subarray ending at index of current remainder also has the same remainder. We calculate the length of the current subarray by subtracting the ending index of the previous subarray with the same remainder from the current index (i).
 *
 * - 4.3: If the currentSubarrayLength is greater than 1 which means we've found a subarray with a length greater than 1 that has a remainder divisible by k. The sum of this subarray must also be divisible by k. We return true as we found a qualifying subarray.
 *
 * 5. Otherwise, we return false if there is no valid subarray.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(n)
 */
const checkSubarraySum = (nums, k) => {
  // This map stores a key as remainder and a value is the end index of current subarray
  const visitedRemainder = new Map();
  let prefixSum = 0;

  // Edge case where a subarray has a sum divisible by k
  visitedRemainder.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    const remainder = prefixSum % k;
    const currentSubarrayLength = i - visitedRemainder.get(remainder);

    if (!visitedRemainder.has(remainder)) {
      visitedRemainder.set(remainder, i);
    } else if (currentSubarrayLength > 1) {
      return true;
    }
  }

  return false;
};

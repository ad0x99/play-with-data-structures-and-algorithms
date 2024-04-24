/**
 * https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/description/
 * https://www.lintcode.com/problem/911/
 *
 *  * Given an array nums and a target value k, find the maximum length of a subarray that sums to k. If there isn't one, return 0 instead.
 *
 * Hash Table + Prefix Sum Approach
 *
 * We have prefixSum[i] = nums[0...i] => If we can found a j position such that prefixSum[i] - prefixSum[j] = k => sum(nums[j+1...i]) = k.
 *
 * Normal case:
 * - nums =       [4, 1, -1, 5, -2, 3], k = 3
 *                 j             i
 * - prefixSum =  [4, 5, 4,  9, 7, 10]
 *
 * - => prefixSum[0] = 4, prefixSum[4] = 7
 * - => prefixSum[4] - prefixSum[0] = 7 - 4 = 3 = k
 * - => sum(nums[j+1...i]) = sum(nums[1...4]) = k
 * - => longest = i - j = 4 - 0 = 4
 *
 *
 * Special case: nums = [1, -1, 5, -2, 3], k = 3
 *          prefixSum = [1, 0, 5, 3, 6]
 *
 * In this case, we want to find the maximum length of subarray with the sum is equal to 3. As the prefixSum[3] (value of -2) = 3, therefore, the longest subarray should be [1, -1, 5, -2].
 *
 * But in this case, the calculation of complement would be `complement = prefixSum - k = 3 - 3 = 0`, but we know that, there is no value 0 of prefixSum, so we will set a default case and we initialize the Map which is `(0, -1)`.
 *
 *
 * 1.  We create a new Map object (seen) which will store prefix sums encountered so far and their corresponding indices in the nums list.
 * 2. We initialize a variable `prefixSum` to keep track of the running prefix sum throughout the loop. and a variable `ans` to store the maximum length of the subarray found so far.
 * 3. We insert a special case into the seen map. It indicates that an empty subarray (with sum `0`) starts at index `-1` (since it doesn't exist in the actual array). This helps handle cases where the subarray starts from the index of zero.
 * 4. We iterate through each element (`nums[i]`) in the nums list.
 * 5. We update the `prefixSum` by adding the current element to the previous sum. This represents the cumulative sum up to the current index.
 * 6. And then, we calculate the complement (or potential ending sum) for the subarray. This represents the sum we're looking for in a subarray that ends before the current element (i) such that the difference between the current `prefixSum` and this ending sum would be equal to the target sum (k).
 * 7. If the `complement` (representing the potential ending sum of a subarray) exists in the `seen` map, it means there's a subarray ending before the current element (i) that has a sum equal to complement.
 * - 7.1: We can then calculate the length of this subarray by subtracting the index of the ending sum (`seen.get(complement)`) from the current index (`i`).
 *
 * 8. After that, we update the ans (maximum length) if the calculated subarray length is greater than the current maximum.
 * 9. In another case, if the current `prefixSum` doesn't exist in the `seen` map, it means we're encountering this prefix sum for the first time.
 * - 9.1: We update the `seen` map with the current `prefixSum` and its corresponding index (`i`). This is used for future lookups during the loop to identify potential subarrays that could end with this prefixSum.
 *
 * 10. After iterating through all elements, we return the `ans` which represents the maximum length of the subarray found in the nums list.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(n)
 */
const maxSubArrayLen = (nums, k) => {
  let seen = new Map();
  let prefixSum = 0;
  let ans = 0;

  seen.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    let complement = prefixSum - k;

    if (seen.has(complement)) {
      let j = seen.get(complement);
      ans = Math.max(ans, i - j);
    }

    if (!seen.has(prefixSum)) {
      seen.set(prefixSum, i);
    }
  }

  return ans;
};

console.log(maxSubArrayLen([1, -1, 5, -2, 3], 3)); // 4
console.log(maxSubArrayLen([-2, -1, 2, 1], 1)); // 2

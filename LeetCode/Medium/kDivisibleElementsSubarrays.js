/**
 * https://leetcode.com/problems/k-divisible-elements-subarrays/description/
 *
 * Brute Force Approach
 *
 * Idea: We will find all the potential unique subarrays of the nums by using a Set to keep the unique subarrays.
 *
 * When building the subarray, we will remove all the invalid subarrays which have number of elements that divisible by p are greater than k.
 *
 * But when using the Set to store unique subarray, the Set can't store unique subarray, therefore, we're going to convert the subarray into a string format, then we store into the Set.
 *
 * Implementation
 *
 * 1. We initialize a `uniqueSubarray` Set to store unique sub-arrays encountered based on their string representation (elements joined by '-'). We use Set to avoid duplicate subarray.
 *
 * 2. We iterate through the array twice.
 *
 * 3. The outer loop (`i`) iterates from the beginning (`i = 0`) to the end (`i < nums.length`) of the array, defining the starting point of the subarray. And the inner loop (`j`) iterates from the current i (starting point) to the end (`j < nums.length`) of the array, defining the ending point of the subarray.
 *
 * 4. At each iteration, we check if we found a number is divisible by p, we increment the count by one to keep track how many number of elements that divisible by p.
 *
 * 5. In the next condition, we check if the count is greater than k (meaning the subarray already has more than k elements divisible by `p`), we break the inner loop to skip the current subarray, since the current subarray is not a valid one.
 *
 * 6. To store the unique subarray, we will convert the subarray into a string and join all element with a hyphen ("-"). This transforms the subarray into a unique string that will be added to the Set for preventing duplication.
 *
 * 7. After iterating through all possible sub-arrays, we return the size of the `uniqueSubarray` set, which represents the total count of valid distinct sub-arrays.
 *
 * Time complexity: O(n ^ 2), where n is the length of nums.
 *
 * Space complexity: O(n), where n is the length of uniqueSubarray Set.
 */
const countDistinct = (nums, k, p) => {
  const uniqueSubarray = new Set();

  for (let i = 0; i < nums.length; i++) {
    let count = 0;

    for (let j = i; j < nums.length; j++) {
      if (nums[j] % p === 0) count++;
      if (count > k) break;

      const array = nums.slice(i, j + 1);
      if (array.length) uniqueSubarray.add(array.join('-'));
    }
  }

  return uniqueSubarray.size;
};

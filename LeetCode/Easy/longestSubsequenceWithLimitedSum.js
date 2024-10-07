/**
 * https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/
 *
 * Binary Search Approach: The idea is to leverage the prefix sum and binary search to find the target sum. In order to do that, firstly, we need to sort the array and calculate the prefix sum of the input array. And after that, we'll use the binary search algorithm to find the target sum that is less than or equal to the target query.
 *
 * 1. We sort the array in ascending order.
 * 2. We create an array to store the prefix sum result which is called prefixSum
 * 3. After we've got the prefix sum result, we will create a binary search function to find the target sum. When we return the index of the target sum result from binary search, we add the found index by 1. Because we want to get the length of the subarray that has found target sum.
 * 4. We iterate through the queries array and at each query, we use the binary search algorithm to find the current query in the prefix sum result. And when we found the answer, we push it into the result array. At this step, there is a edge case whereas the current query is less than the first prefix sum, in this case, we just add 0 as the answer. Otherwise, we continue finding the target sum with binary search.
 *
 * Time complexity: O(n log n + q log n), where n is the number of elements in the nums array and q is the number of queries.
 *
 * - Sorting the nums array takes O(n log n) time.
 * - Calculating the prefix sum array takes O(n) time.
 * - For each query, binary search is performed on the prefix sum array, which takes O(log n) time.
 *
 * Space complexity: O(n), where n is the number of elements in the nums array. This is because we are storing the prefix sum array, which has the same length as the nums array.
 */
const answerQueries = (nums, queries) => {
  // Sort the array in ascending order
  nums.sort((a, b) => a - b);

  // Calculate the prefix sum of sorted array
  let prefixSum = [];
  let currentSum = 0;

  for (let num of nums) {
    currentSum += num;
    prefixSum.push(currentSum);
  }

  // Binary search function to find the target sum
  const findTargetSum = (left, right, target) => {
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      let currentSum = prefixSum[mid];

      if (currentSum === target) {
        return mid + 1;
      } else if (currentSum < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return right + 1;
  };

  // Iterate through each query and find the query from the prefix sum
  let result = [];

  for (let query of queries) {
    let ans = 0;

    // In case the first query is less than the first prefix sum
    // We return 0 as default case
    // Otherwise, we continue to iterate over the prefix sum to find the target query
    if (query >= prefixSum[0]) {
      ans = findTargetSum(0, prefixSum.length - 1, query);
    }

    result.push(ans);
  }

  return result;
};

console.log(answerQueries([4, 5, 2, 1], [3, 10, 21])); // [2,3,4]

/**
 * https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/description/
 *
 * Brute Force Approach
 *
 * 1. We initialize a variable `ans` to `0` to store the length of the longest subarray found so far.
 *
 * 2. We iterate through each element in the `nums` array as a potential starting point for the subarray. The outer loop iterate from `0` to `n-1` (excluding the last element).
 *
 * 3. Inside the outer loop, we initialize two variables for the current subarray:
 * - 3.1: The `minVal` variable stores the minimum value encountered so far within the current subarray. It's initialized to the current element `nums[i]`.
 *
 * - 3.2: The `maxVal` variable stores the maximum value encountered so far within the current subarray. It's also initialized to the current element `nums[i]`.
 *
 * 4. We use another nested loop to iterate through the remaining elements (`j`) in the `nums` array starting from the current `i` (the starting position). This loop essentially considers all possible subarrays starting from i.
 * - 4.1: We update the `minVal` value to ensure `minVal` always holds the minimum value encountered within the current subarray boundaries.
 *
 * - 4.2: We update the `maxVal` to ensure `maxVal` always holds the maximum value encountered within the current subarray boundaries.
 *
 * - 4.3: The reason why we need to find the min and max values is to calculate the maximum absolute diff.
 *
 * 5. After updating the `minVal` and `maxVal` values, we calculate the absolute difference between `maxVal` and `minVal` is greater than the specified limit.
 *
 * - 5.1: If the difference is greater than the limit, it means the current subarray violates the condition (having elements with a difference more than the allowed limit), we will stop the iteration.
 *
 * - 5.2: Otherwise, If the difference within limit, we update the `ans` variable to the maximum length of the current subarray.
 *
 * - 5.3: The `j - i + 1` formula calculates the length of the current subarray. It subtracts the starting index i from the current index j and adds 1 to account for both indices (inclusive). And then we compare the current subarray length with the previously found longest subarray length stored in ans and take the longer one.
 *
 * Time complexity: O(n ^ 2), where n is the length of nums array.
 *
 * Space complexity: O(1)
 */
const longestSubarray = (nums, limit) => {
  const n = nums.length;
  let ans = 0;

  for (let i = 0; i < n; i++) {
    // Assume that the current value is the current max and min values
    let minVal = nums[i];
    let maxVal = nums[i];

    for (let j = i; j < n; j++) {
      minVal = Math.min(minVal, nums[j]);
      maxVal = Math.max(maxVal, nums[j]);

      if (maxVal - minVal > limit) {
        break;
      }

      // Update max subarray length
      ans = Math.max(ans, j - i + 1);
    }
  }

  return ans;
};

/**
 * Sliding Window & Monotonic Queue Approach
 *
 * Idea: We use 2 queues to maintain the maximum and minimum elements within the current subarray window based on their indices. By checking the difference between the values at the front of these queues, we can determine if the subarray adheres to the difference limit.
 *
 * The queues are updated dynamically as we iterate through the array, ensuring they reflect the current window.
 *
 * Shrinking the window from the left (increasing left) is necessary when the difference between maximum and minimum exceeds the limit. This ensures the subarray remains valid.
 *
 * 1. We initialize the `maxQueue` to store indices of elements in ascending order of their values (maximum queue), and the `minQueue` to store indices of elements in descending order of their values (minimum queue).
 *
 * 2. We initialize the `ans` variable to keep track the length of the longest subarray found so far (initialized to 0), adn the `left` variable to keep track the starting index of the current subarray window (initialized to 0).
 *
 * 3. We iterate through each element in the nums array using a right pointer that goes from `0` to `n-1` (exclusive).
 *
 * 4. Updating Max/Min Queue: We want to maintain the `maxQueue` to always hold indices of elements in ascending order and the `minQueue` to always hold indices of elements in descending order of their values.
 *
 * - 4.1: We check if the `maxQueue` is not empty and the last element's value is less than or equal to the current element (`nums[right]`). It means a smaller or equal element has come up, so we remove the previous larger element's index from the maxQueue.
 *
 * - 4.2: We then add the current element's index (`right`) to the `maxQueue`. This ensures the queue reflects the current maximum elements within the window.
 *
 * - 4.3: Similar to the maxQueue, we check if the `minQueue` is not empty and the last element's value is greater than or equal to the current element (`nums[right]`). It means a larger or equal element has come up, so we remove the previous smaller element's index from the minQueue.
 *
 * - 4.4: We then add the current element's index (`right`) to the `minQueue`. This ensures the queue reflects the current minimum elements within the window.
 *
 * 5. Shrinking the Window: We check if the absolute difference between the maximum and minimum elements within the window (based on their indices in the queues) is greater than the specified limit.
 *
 * - 5.1: If the difference is greater than the limit, it means the current subarray violates the condition. We need to shrink the window from the left (left += 1) to bring the difference within the limit.
 *
 * - 5.2: Inside the loop: we check if the index of the first element in the maxQueue is less than the current left (meaning it's outside the window), we remove it. We perform a similar check for the minQueue as well.
 *
 * 6. After potentially shrinking the window or adding a new element, we calculate the current subarray length using `right - left + 1` and compare it with the previously found longest subarray length stored in ans. We then update `ans` with the maximum length.
 *
 * Time complexity: O(n), where n is the length of the nums array.
 *
 * Space complexity: O(n), where n is the length of the maxQueue, and maxQueue.
 */
const longestSubarray = (nums, limit) => {
  const n = nums.length;
  let maxQueue = [];
  let minQueue = [];
  let ans = 0;
  let left = 0;

  for (let right = 0; right < n; right++) {
    while (
      maxQueue.length &&
      nums[maxQueue[maxQueue.length - 1]] <= nums[right]
    ) {
      maxQueue.pop();
    }
    maxQueue.push(right);

    while (
      minQueue.length &&
      nums[minQueue[minQueue.length - 1]] >= nums[right]
    ) {
      minQueue.pop();
    }
    minQueue.push(right);

    while (nums[maxQueue[0]] - nums[minQueue[0]] > limit) {
      left += 1;

      if (maxQueue[0] < left) maxQueue.shift();
      if (minQueue[0] < left) minQueue.shift();
    }

    ans = Math.max(ans, right - left + 1);
  }

  return ans;
};

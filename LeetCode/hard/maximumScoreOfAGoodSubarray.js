/**
 * https://leetcode.com/problems/maximum-score-of-a-good-subarray/
 *
 * Stack Approach
 *
 * We have to iterate through all possible subarrays containing k and calculate their scores.
 *
 * A subarray will have 2 boundaries, the left and the right. And because of i <= k <= j, therefore, the valid subarray should contain k inside it.
 *
 * The idea is we will find the left (start index) and the right (end index) respectively to form a valid subarray. And based on that valid subarray to calculate the maximum score, and then we compare the score of valid subarrays together to get the maximum one.
 *
 * 1. We create a `left` array to store the index of the closest element on the left of each element in nums that is smaller than that element.
 *
 * 2. We create `right` array to store the index of the closest element on the right of each element in nums that is greater than that element.
 *
 * 3. We create a `stack` that will be used to store indices during processing.
 *
 * 4. We iterate through the nums array from index `0` to `n-1`.
 *
 * 5. Inside the loop:
 * - 5.1: As long as the stack is not empty and the element at the top of the stack is greater than or equal to the current element (`nums[i]`), it means there's no smaller element on the left yet for the current element nums[i], so it keeps popping elements from the stack.
 *
 * - 5.2: Otherwise, if we reach to the smaller element, it means we found the closest smaller element on the left. We then set `left[i]` to the index of the element at the top of the stack.
 *
 * - 5.3: After processing the stack, we push the current index `i` onto the stack. This is because the current element might be the smaller element for elements on its right side in the future.
 *
 * 6. After finding left indices, we clear the stack to reuse it for finding right indices.
 *
 * 7. We iterate through the nums array in reverse order (from `n-1` to `0`), we do the similar check as the left indices, but instead of updating the left array, we'll update the right array with the index of the closest greater element found on the right.
 *
 * 8. Calculating Maximum Score: We initialize a variable result to `0`, which will store the maximum score found so far.
 *
 * 9. We iterate through the nums array from `0` to `n-1`.
 *
 * 10. Inside the loop, we check two conditions:
 * - 10.1: If the closest element on the `left` of the current element `i` has an index less than `k`.
 *
 * - 10.2: And if the closest element on the `right` of the current element `i` has an index greater than `k`.
 *
 * - 10.3: It means `k` is within the subarray formed by elements from left[i] + 1 (the element after the closest smaller element on the left) to right[i] - 1 (the element before the closest greater element on the right).
 *
 * - 10.4: If both conditions are true, we calculate the potential score for this subarray using `nums[i] * (right[i] - left[i] - 1)`. This considers the value of the current element nums[i] and the length of the subarray (excluding the closest smaller and greater elements).
 *
 * - 10.5: We compare the potential score with the current maxScore and update maxScore if the potential score is higher.
 *
 * 11. After iterating through all elements, we return the final value of maxScore.
 *
 * Time complexity: O(n), where n is the number of elements in the nums array
 *
 * Space complexity: O(n), where n is the number of elements in the left and right arrays
 */
const maximumScoreStack = (nums, k) => {
  const n = nums.length;
  const left = new Array(n).fill(-1);
  const right = new Array(n).fill(n);
  let stack = [];

  // Find left indices using stack
  // left[i] is the closest element in the left of the current element such that smaller than the current element
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }

    if (stack.length) {
      left[i] = stack[stack.length - 1];
    }

    stack.push(i);
  }

  // Find right indices using stack
  // right[i] is the closest element in the right of the current element such that larger than the current element
  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }

    if (stack.length) {
      right[i] = stack[stack.length - 1];
    }

    stack.push(i);
  }

  // Calculate maximum score
  // left[i] + 1  to right[i] - 1 is the longest subarray that contains i
  let maxScore = 0;

  for (let i = 0; i < n; i++) {
    if (left[i] < k && right[i] > k) {
      maxScore = Math.max(maxScore, nums[i] * (right[i] - left[i] - 1));
    }
  }

  return maxScore;
};

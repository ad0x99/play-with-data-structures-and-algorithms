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
 * - 3.1: The `min_value` variable stores the minimum value encountered so far within the current subarray. It's initialized to the current element `nums[i]`.
 *
 * - 3.2: The `max_value` variable stores the maximum value encountered so far within the current subarray. It's also initialized to the current element `nums[i]`.
 *
 * 4. We use another nested loop to iterate through the remaining elements (`j`) in the `nums` array starting from the current `i` (the starting position). This loop essentially considers all possible subarrays starting from i.
 * - 4.1: We update the `min_value` value to ensure `min_value` always holds the minimum value encountered within the current subarray boundaries.
 *
 * - 4.2: We update the `max_value` to ensure `max_value` always holds the maximum value encountered within the current subarray boundaries.
 *
 * - 4.3: The reason why we need to find the min and max values is to calculate the maximum absolute diff.
 *
 * 5. After updating the `min_value` and `max_value` values, we calculate the absolute difference between `max_value` and `min_value` is greater than the specified limit.
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
impl Solution {
    pub fn longest_subarray(nums: Vec<i32>, limit: i32) -> i32 {
        let n = nums.len();
        let mut ans = 0;

        for i in 0..n {
            let mut max_value = nums[i];
            let mut min_value = nums[i];

            for j in i..n {
                max_value = max_value.max(nums[j]);
                min_value = min_value.min(nums[j]);

                if max_value - min_value > limit {
                    break;
                }

                ans = ans.max(j - i + 1);
            }
        }

        ans as i32
    }
}

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
impl Solution {
    pub fn longest_subarray(nums: Vec<i32>, limit: i32) -> i32 {
        let n = nums.len();
        let mut max_queue = Vec::new();
        let mut min_queue = Vec::new();
        let mut ans = 0;
        let mut left = 0;

        for right in 0..n {
            while max_queue.len() > 0 && nums[max_queue[max_queue.len() - 1]] <= nums[right] {
                max_queue.pop();
            }
            max_queue.push(right);

            while min_queue.len() > 0 && nums[min_queue[min_queue.len() - 1]] >= nums[right] {
                min_queue.pop();
            }
            min_queue.push(right);

            while nums[max_queue[0]] - nums[min_queue[0]] > limit {
                left += 1;

                if max_queue[0] < left {
                    max_queue.remove(0);
                }

                if min_queue[0] < left {
                    min_queue.remove(0);
                }
            }

            ans = ans.max(right - left + 1);
        }

        ans as i32
    }
}

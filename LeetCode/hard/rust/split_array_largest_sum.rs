/**
 * https://leetcode.com/problems/split-array-largest-sum/description
 *
 * Binary Search Approach
 *
 * Idea: The problem inherently has a range of possible solutions for the maximum sum allowed per subarray. This range is bounded by:
 * - Minimum possible sum: The largest element in the array (each element can be in its own subarray).
 *
 * - Maximum possible sum: The sum of all elements in the array (all elements can be in a single subarray).
 *
 * By iteratively checking a potential maximum sum in the middle of this range, we can efficiently determine if splitting is possible with that sum.
 *
 * If splitting is possible with mid (meaning it requires `k` or fewer subarrays), it implies that even smaller sums might also be feasible. So, we explore the left half of the search space (`right = largestSum - 1`) to see if a smaller sum can achieve the split condition.
 *
 * Conversely, if splitting is not possible with current largest sum (meaning it requires more than k subarrays), it implies that larger sums might be necessary. So, we explore the right half of the search space (`left = largestSum + 1`) to find a larger sum that might allow for splitting within `k` subarrays.
 *
 * Implementation
 *
 * 1. We initialize a `left` variable to the maximum element in nums. This represents the minimum possible sum for a single-element subarray. And a `right` variable to store the sum of all elements in nums (representing the maximum possible sum for a single subarray).
 *
 * 2. We initialize a `ans` variable `-1` to track the final minimized largest sum.
 *
 * 3. Binary Search: As long as left is less than or equal to right, we calculate the `largestSum` value as a potential maximum sum for subarrays.
 *
 * 4. Inside the binary search, the `countSplitSubarray` function is called with `largestSum` and `nums`. It determines the minimum number of subarrays needed to hold all elements if the maximum sum per subarray is restricted to `largestSum`.
 *
 * - 4.1: If the subarray count is less than or equal to `k`, this means it's possible to split the array into `k` or fewer subarrays with a maximum sum of `largestSum`. We then update `ans` to `largestSum` (potential minimized largest sum found so far),and narrow down the search space by setting `right` to `largestSum - 1`. We explore values less than `largestSum` to see if a smaller sum can still satisfy the split condition.
 *
 * - 4.2: If the subarray count is greater than `k`, it means splitting with `largestSum` as the maximum subarray sum is not possible within `k` subarrays. We narrow down the search space by setting `left` to `largestSum + 1`. We explore values greater than `largestSum` to find a larger sum that might allow for splitting within `k` subarrays.
 *
 * 5. We return `ans` as the result.
 *
 * Time complexity: O(n * log(MAX_SUM)), where n is the number of nums array.
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn split_array(nums: Vec<i32>, k: i32) -> i32 {
        let mut left = *nums.iter().max().unwrap();
        let mut right: i32 = nums.iter().sum();
        let mut ans = -1;

        while left <= right {
            let largest_sum = ((left + right) / 2) as i32;

            if Self::count_split_subarray(largest_sum, &nums) <= k {
                ans = largest_sum;
                right = largest_sum - 1;
            } else {
                left = largest_sum + 1;
            }
        }

        ans
    }

    /**
     * Count the minimum number of subarrays needed to hold all elements if the maximum sum per subarray is restricted to current largest sum.
     *
     * 1. We initialize count to `1`, which is representing the minimum number of subarrays needed (initially assuming all elements go into one subarray).And the `currentSum` is initialized to `0` to keep track of the sum within the current subarray.
     *
     * 2. We iterate through each element in `nums` array.
     *
     * 3. We increase the `currentSum` by the current element `num`.
     *
     * 4. Checking Subarray Sum Limit:
     * - 4.1: If the `currentSum` becomes greater than `largestSum` (the maximum allowed sum for a subarray), this means the current subarray has reached its capacity, and a new subarray needs to be started.
     *
     * - 4.2: We increase `count` by `1` to reflect the need for an additional subarray. And we reset `currentSum` to the current element num to start a new subarray.
     *
     * 5. We return the subarray count
     *
     */
    fn count_split_subarray(largest_sum: i32, nums: &Vec<i32>) -> i32 {
        let mut count_subarray = 1;
        let mut current_sum = 0;

        for i in 0..nums.len() {
            current_sum += nums[i];

            if current_sum > largest_sum {
                count_subarray += 1;
                current_sum = nums[i];
            }
        }

        count_subarray
    }
}

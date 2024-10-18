/**
 * https://leetcode.com/problems/partition-equal-subset-sum/description/
 *
 * Bottom-Up Dynamic Programming
 *
 * Implementation
 *
 * 1. We calculate the total sum of all elements in the array. If the total sum is odd, it's impossible to split the array into two equal subsets, as the two subsets must have an equal sum.
 *
 * 2. We calculate the target sum as the half of the total sum. Our goal is to determine if we can find a subset of nums that sums up to this targetSum. If such a subset exists, the rest of the elements will naturally sum to the same amount.
 *
 * 3. We create a possibleSums set with the base case 0 because a sum of 0 is always possible (by choosing no elements). This set will track all the sums that can be formed with subsets of the array.
 *
 * 4. In the outer loop, we iterate over each num in nums. We create a new set newSums, starting with the current possibleSums.
 *
 * 5. In the inner loop, for every sim in possibleSums, we add the current `num` to that sum and store the result in newSums. After processing each number, possibleSums is updated with newSums.
 *
 * 6. Finally, after iterating through all the numbers, we check whether targetSum is present in the possibleSums set. If it is, it means we can form a subset with the required sum, so we return true. Otherwise, we return false.
 *
 * Time complexity: O(n * targetSum), where n is the number of elements in nums and targetSum is half the total sum.
 *
 * Space complexity: O(targetSum) due to the space used by the set possibleSums.
 */
use std::collections::HashSet;
impl Solution {
    pub fn can_partition(nums: Vec<i32>) -> bool {
        // Calculate the total sum of the array
        let total_sum: i32 = nums.iter().sum();
        // If the sum is odd, it's impossible to split into two equal subsets
        if total_sum % 2 != 0 {
            return false;
        }

        let target_sum = total_sum / 2;

        // Create a HashSet to store reachable subset sums
        let mut possible_sums = HashSet::new();
        possible_sums.insert(0); // Base case: zero sum is always possible

        for &num in &nums {
            // Create a new set to store the new reachable sums
            let mut new_sums = possible_sums.clone();

            for &sum in &possible_sums {
                // Add the current number to each reachable sum
                new_sums.insert(sum + num);
            }

            // Update with new possible sums
            possible_sums = new_sums;
        }

        // Check if the target sum can be achieved
        possible_sums.contains(&target_sum)
    }
}

/**
 * Bottom-Up Dynamic Programming
 *
 * Idea: The dp array stores the intermediate results, where dp[i] represents whether a sum of i can be achieved using the elements from the nums array up to the current index.
 *
 * Implementation
 *
 * 1. We calculate the total sum of all elements in the array. If the total sum is odd, it's impossible to split the array into two equal subsets, as the two subsets must have an equal sum.
 *
 * 2. We calculate the target sum as the half of the total sum. Our goal is to determine if we can find a subset of nums that sums up to this targetSum. If such a subset exists, the rest of the elements will naturally sum to the same amount.
 *
 * 3. We create a 1D array dp of size targetSum + 1, initialized with false. This array will track whether we can form each possible sum from 0 to targetSum using a subset of the numbers.
 * - 3.1: The dp[i] tells us whether we can form a sum of i using any subset of the numbers or not.
 * - 3.2: Base case: We initialize dp[0] = true because a sum of 0 can always be formed by using an empty subset.
 *
 * 4. In the outer loop, we iterate over each num in nums. For each number, we try to update the possible sums in the dp array.
 *
 * 5. In the inner loop (Backward Loop), we run backwards from targetSum down to num. The reason for iterating backward is to prevent overwriting results from the current number. By doing this, we ensure that each number is only used once for each sum calculation.
 *
 * 6. We then update dp[sum]. For each sum i, we check:
 * - 6.1: If dp[sum] is already true, it means the sum can be achieved without using the current num.
 * - 6.2: Otherwise, If `dp[sum - num]` is true, it means we can form `sum - num`, so adding the current num would allow us to form `sum`. Therefore, we set dp[sum] = true.
 *
 * 7.: After processing all the numbers, we check dp[targetSum]. If it's true, it means we can form a subset whose sum is equal to targetSum, so we return true. Otherwise, we return false.
 *
 * Time Complexity: O(n * targetSum) where n is the number of elements in nums and targetSum is half of the total sum.
 *
 * Space Complexity: O(targetSum) since we only need an array of size targetSum + 1.
 */
impl Solution {
    pub fn can_partition(nums: Vec<i32>) -> bool {
        // Calculate the total sum of the array
        let total_sum: i32 = nums.iter().sum();

        // If the sum is odd, it's impossible to split into two equal subsets
        if total_sum % 2 != 0 {
            return false;
        }

        let target_sum = (total_sum / 2) as usize;
        // Create a dp array where dp[i] means whether sum i can be achieved
        let mut dp = vec![false; target_sum + 1];
        dp[0] = true; // Base case: zero sum is always achievable

        for &num in &nums {
            // Traverse dp array from right to left to avoid overwriting results
            for sum in (num as usize..=target_sum).rev() {
                dp[sum] = dp[sum] || dp[sum - num as usize]
            }
        }

        // Check if the target sum is achievable
        dp[target_sum]
    }
}

/**
 * Top-Down Dynamic Programming
 *
 * Idea: We can solve this problem using a top-down dynamic programming approach with memoization. In this method, we recursively try to find if there's a subset that sums to the target value and store intermediate results to avoid redundant calculations
 *
 * We will recursively check whether a subset sum of targetSum can be achieved from the first i elements of the array. The key idea is to explore two possibilities at each step:
 * - Include the current number in the subset.
 * - Exclude the current number from the subset.
 *
 * For optimization, we use memoization to store the results of sub-problems (i.e., whether a subset sum can be achieved with a certain targetSum and a given index).
 *
 * Implementation
 *
 * 1. We calculate the total sum of all elements in the array. If the total sum is odd, it's impossible to split the array into two equal subsets, as the two subsets must have an equal sum.
 *
 * 2. We calculate the target sum as the half of the total sum. Our goal is to determine if we can find a subset of nums that sums up to this targetSum. If such a subset exists, the rest of the elements will naturally sum to the same amount.
 *
 * 3. We create a Map called memo to store results of sub-problems. The key is a combination of the current index i and the target sum that we're trying to achieve.
 *
 * 4. Recursion Relation: Each recursion dp(i, target), we try to determine if we can achieve target sum using the first i numbers of the array.
 * - 4.1: Base cases: If target === 0, we return true (we've found a valid subset), or if i === 0, we check if the first element of the array is equal to target.
 *
 * - 4.2: If the current number nums[i] is greater than the remaining target, we skip this number and just recurse with `i - 1` (next number).
 *
 * - 4.3: Otherwise, we explore both possibilities: either we include the current number in the subset or we exclude it. We return true if either of these choices leads to a valid solution.
 *
 * 5. If we’ve already solved the subproblem (i, target) before, the result is fetched from the memo table, avoiding redundant calculations.
 *
 * Time Complexity: O(n * targetSum), where n is the number of elements in the array and targetSum is half the total sum of the array.
 *
 * Space Complexity: O(n * targetSum), for memoization and the recursion call stack.
 */
use std::collections::HashMap;
impl Solution {
    pub fn can_partition(nums: Vec<i32>) -> bool {
        // Calculate the total sum of the array
        let total_sum: i32 = nums.iter().sum();

        // If the sum is odd, it's impossible to split into two equal subsets
        if total_sum % 2 != 0 {
            return false;
        }

        let target_sum = total_sum / 2;
        let mut memo = HashMap::new();

        fn dp(
            i: usize,
            target: i32,
            nums: &Vec<i32>,
            memo: &mut HashMap<(usize, i32), bool>,
        ) -> bool {
            // Base cases
            if target == 0 {
                return true;
            }
            if i == 0 {
                return nums[0] == target;
            }

            // Memoization
            let key = (i, target);
            if let Some(&result) = memo.get(&key) {
                return result;
            }

            // If the current number is greater than target, skip it
            if nums[i] > target {
                let result = dp(i - 1, target, nums, memo);
                memo.insert(key, result);
                return result;
            }

            // Explore both possibilities: include or exclude the current number
            let result = dp(i - 1, target, nums, memo) || dp(i - 1, target - nums[i], nums, memo);
            memo.insert(key, result);
            result
        }

        // Start the recursion from the last index and the target sum
        dp(nums.len() - 1, target_sum, &nums, &mut memo)
    }
}

/**
 * Backtracking Approach (TLE)
 *
 * Idea: Recursively explore subsets by deciding whether to include or exclude each element in the subset. If at any point a subset reaches the target sum (half of the total sum), return true.
 *
 * Implementation
 *
 * 1. We calculate the total sum of all elements in the array. If the total sum is odd, it's impossible to split the array into two equal subsets, as the two subsets must have an equal sum.
 *
 * 2. We calculate the target sum as the half of the total sum. Our goal is to determine if we can find a subset of nums that sums up to this targetSum. If such a subset exists, the rest of the elements will naturally sum to the same amount.
 *
 * 3. Backtracking:
 * - 3.1: Base Cases: If currentSum equals targetSum, return true since we’ve found a valid subset. Or If currentSum exceeds targetSum or we’ve considered all elements, return false.
 *
 * - 3.2: Recursive Exploration: We try to include the current element `nums[i]` in the subset.
 *
 * - 3.3: If the first recursive call returns true, we stop and return true immediately.
Otherwise, we exclude the current element from the subset and continue exploring.
 *
 * Time Complexity: O(2^n), where n is the number of elements in the array. This is because, in the worst case, we explore every possible subset of the array (each element has two choices: either include or exclude it).
 *
 * Space Complexity: O(n), where n is the depth of the recursion tree, which corresponds to the number of elements in the array.
 */
impl Solution {
    pub fn can_partition(nums: Vec<i32>) -> bool {
        // Calculate the total sum of the array
        let total_sum: i32 = nums.iter().sum();

        // If the sum is odd, it's impossible to split into two equal subsets
        if total_sum % 2 != 0 {
            return false;
        }

        let target_sum = total_sum / 2;

        fn backtrack(i: usize, target: i32, nums: &Vec<i32>, current_sum: i32) -> bool {
            // Base case: if we reach the target sum, return true
            if current_sum == target {
                return true;
            }

            // If we exceed the target sum or reach the end of the array, return false
            if current_sum > target || i >= nums.len() {
                return false;
            }

            // Include the current element in the subset and explore
            if backtrack(i + 1, target, nums, current_sum + nums[i]) {
                return true;
            }

            // Exclude the current element from the subset and explore
            backtrack(i + 1, target, nums, current_sum)
        }

        backtrack(0, target_sum, &nums, 0)
    }
}

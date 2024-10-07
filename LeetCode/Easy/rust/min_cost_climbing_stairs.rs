use std::collections::HashMap;

/**
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 *
 * 1. We define a variable `n` to store the length of the cost array (number of steps), and an empty hashmap `memo` that will be used for memoization (storing previously calculated results).
 *
 * 2. The base case:
 * - 2.1: We first check if the result for the current step (`n`) is already stored in the `memo` hashmap, we return the cached value directly.
 * - 2.2: If `n` is less than `0`, it means we've gone beyond the staircase (invalid step), so we return 0 (no cost).
 * - 2.3: If `n` is less than or equal to `1`, we've reached either the 0th or 1st step. In these base cases, the minimum cost is simply the cost of that specific step (`cost[n]`).
 *
 * 3. Recursive Calculation: Otherwise, we need to calculate the minimum cost to reach the current step (n). We have to consider two possibilities:
 * - 3.1: Climbing one step from the previous step (`n - 1`).
 * - 3.2: Climbing two steps from the step before the previous step (`n - 2`).
 * - 3.3: We add the cost of the current step (`cost[n]`) to the minimum cost obtained from either of these possibilities.
 *
 * 4. The calculated minimum cost for the current step (n) is then stored in the `memo` hashmap for future reference.
 *
 * 5. Finally, we return the minimum cost to reach the current step.
 *
 * Time complexity: O(n) - where n is the number of costs
 *
 * Space complexity: O(n) - where n is the length of the memo.
 */
impl Solution {
    fn min_cost_climbing_stairs(cost: Vec<i32>) -> i32 {
        let n = cost.len();
        let mut memo: HashMap<usize, i32> = HashMap::new();

        fn min_cost(cost: &Vec<i32>, n: usize, memo: &mut HashMap<usize, i32>) -> i32 {
            if let Some(ans) = memo.get(&n) {
                return *ans;
            }
            if n < 0 {
                return 0;
            }
            if n <= 1 {
                return cost[n];
            }

            let ans = cost[n] + i32::min(min_cost(cost, n - 1, memo), min_cost(cost, n - 2, memo));
            memo.insert(n, ans);
            ans
        }

        i32::min(
            min_cost(&cost, n - 1, &mut memo),
            min_cost(&cost, n - 2, &mut memo),
        )
    }
}

/**
 *
 * Dynamic Programming Approach
 *
 * 1. The base case:
 * - 1.1: If there's only one step (n === 1), the minimum cost is the cost of that step itself.
 * - 1.2: If there are two steps (n === 2), the minimum cost is the smaller of the costs for the 0th and 1st steps.
 *
 * 2. We create a DP (Dynamic Programming) array `dp` of size `n` to store the minimum cost to reach each step. We initialize all elements of `dp` to the zero except dp[0] and dp[1], which are set to the costs of the 0th and 1st steps, respectively.
 *
 * 3. We iterate through the `dp` array from the 2nd step (i = 2) to the last step (n - 1). For each step `i`, the minimum cost to reach it can come from either:
 * - 3.1: The previous step (i - 1) plus the cost of the current step (cost[i]).
 * - 3.2: The step before the previous step (i - 2) plus the cost of the current step (cost[i]).
 * - 3.3: We will get the minimum between those 2 and store it in the current dp position `dp[i]`.
 *
 * 4. After iterating through all steps, the minimum cost to reach the top floor (last step) is the minimum of `dp[n - 1]` and `dp[n - 2]`. This is because you can either end on the second-last step or the last step to reach the top.
 *
 * Time complexity: O(n) - where n is the length of the cost array
 *
 * Space complexity: O(n) - where n is the length of the DP array
 *
 */
impl Solution {
    fn min_cost_climbing_stairs(cost: Vec<i32>) -> i32 {
        let n = cost.len();

        // Handle base cases (0 or 1 steps)
        if n == 1 {
            return cost[0];
        }
        if n == 2 {
            return cost[0].min(cost[1]);
        }

        let mut dp = vec![0; n];
        dp[0] = cost[0];
        dp[1] = cost[1];

        for i in 2..n {
            // Minimum cost can come from either the previous step or the step before that
            dp[i] = i32::min(dp[i - 1] + cost[i], dp[i - 2] + cost[i]);
        }

        // Return the minimum cost to reach the last step (top of the floor)
        i32::min(dp[n - 1], dp[n - 2])
    }
}

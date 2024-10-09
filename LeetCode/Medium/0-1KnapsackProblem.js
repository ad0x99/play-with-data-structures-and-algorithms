/**
 * https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1
 * https://en.wikipedia.org/wiki/Knapsack_problem
 *
 * Dynamic Programming Approach
 *
 * Idea: The dp(i, w) represents the maximum value obtainable by considering the first i items and having a knapsack capacity w
 *
 * Base case: When i === -1, it means there are no items left to consider, so we return 0.
 *
 * There are two cases to be considered:
 * 1. Skip the current item: Recursively call dp(i-1, w) to move to the next item without taking the current one.
 *
 * 2. Pick the current item: If the current item fits (w >= weights[i]), the recursive call dp(i-1, w - weights[i]) is made to see how much value we can get with the remaining capacity after picking the current item.
 *
 * Time complexity: O(n * W), where n is the number of items, and W is the capacity of the knapsack.
 *
 * Space complexity: O(n * W), for stack and memoization
 */
class Solution {
  // Function to return max value that can be put in knapsack of capacity W.
  knapSack(W, wt, val) {
    const n = val.length;
    // Cache result
    const memo = {};

    const dp = (i, w) => {
      // Base case: no items left
      if (i === -1) return 0;

      // Create a unique key for memoization
      const key = `${i},${w}`;
      if (key in memo) return memo[key];

      // Case 1: Skip the ith item
      let ans = dp(i - 1, w);

      // Case 2: Pick the ith item if weight allows
      if (w >= wt[i]) {
        ans = Math.max(ans, dp(i - 1, w - wt[i]) + val[i]);
      }

      // Store result in memo and return
      memo[key] = ans;
      return ans;
    };

    // Start dp from the last item (n-1) and knapsack capacity W
    return dp(n - 1, W);
  }
}

const run = new Solution();
console.log(run.knapSack(4, [4, 5, 1], [(1, 2, 3)])); // 3

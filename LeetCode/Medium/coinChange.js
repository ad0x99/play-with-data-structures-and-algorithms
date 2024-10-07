/**
 * https://leetcode.com/problems/coin-change/description/
 *
 * Top-Down Dynamic Programming Approach
 *
 * 1. We create a memo map to store previously calculated results for different amounts.
 *
 * 2. Inside the DP function, we first check if the result for the current amount already exists in the memo map and return the stored value directly (avoiding recalculation).
 *
 * 3. The Base Case: If the amount is 0 (no money to make change for), it means a valid combination exists with 0 coins. We return 0 in this case.
 *
 * 4. Dynamic Programming:
 * - 4.1: We initialize a variable `ans` to Number.MAX_VALUE for storing the minimum number of coins found so far.
 *
 * - 4.2: We iterate through each coin denomination (coin) in the coins array and check. If the current coin denomination (coin) is less than or equal to the remaining amount. This ensures we only consider valid coin combinations that don't exceed the target amount.
 *
 * - 4.3: If the coin is valid, we make a recursive call to `dp(amount - coin)`. This call explores the possibility of using the current coin (coin) and then calculates the minimum number of coins needed for the remaining amount (amount - coin). We add 1 to the result of the recursive call because we're including the current coin (coin) in the combination. This 1 represents the current coin being used in addition to the minimum coins found for the remaining amount.
 *
 * - 4.4: We add `1` (for the current coin used) to the result of the recursive call and compare it with the current ans. It updates ans to the minimum value found so far.
 *
 * - 4.5: Memoization Storage: After exploring all coin combinations, we store the final `ans` (minimum coins for the current amount) in the `memo` map.
 *
 * 5. We return `ans` which represents the minimum number of coins needed to make the target amount.
 *
 * Time complexity: O(m * n), where m is the amount and n is the number of coins.
 *
 * Space complexity: O(m), where m is the amount.
 *
 */
const coinChange = (coins, amount) => {
  const memo = {};

  const dp = (amount) => {
    if (memo[amount]) return memo[amount];

    // Base case
    if (amount === 0) return 0;

    let ans = Number.MAX_VALUE;
    for (const coin of coins) {
      if (coin <= amount) {
        ans = Math.min(ans, dp(amount - coin) + 1);
      }
    }

    memo[amount] = ans;
    return ans;
  };

  const ans = dp(amount);
  return ans === Number.MAX_VALUE ? -1 : ans;
};

/**
 *
 * Bottom-Up Dynamic Programming Approach
 *
 * 1. We create a dynamic programming array dp of size `amount + 1` with initial value is `Number.MAX_VALUE`. This array will store the minimum number of coins needed to make change for every amount from `0` to amount.
 *
 * 2. The Base Case: We add the amount at index of `0` (no money to make change for) is `0`.
 *
 * 3. In the outer loop, we iterate through all possible amounts from 1 to amount, and in the inner loop, we iterate through each coin denomination (coin) in the coins array.
 *
 * 4. Inside the inner loop, we check if the current coin denomination (`coin`) is less than or equal to the current amount (`am`). This ensures we only consider valid coin combinations that don't exceed the target amount.
 *
 * 5. If the coin is valid, we consider using this coin (`coin`) in the combination.
 * - 5.1: We retrieve the minimum number of coins needed for the remaining amount (`am - coin`). This value represents the minimum coins found so far for that remaining amount.
 * - 5.2: We add 1 to the retrieved value. This 1 represents the current coin being used in the combination.
 * - 5.3: The final result (`dp[am - coin] + 1`) is compared with the current value in `dp[am]`. If the newly calculated value (`dp[am - coin] + 1`) is less than the current value in `dp[am]`, it means using the current coin (coin) creates a new minimum for the amount (am). In this case, the value in `dp[am]` is updated with the new minimum (`dp[am] = dp[am - coin] + 1`).
 *s
 * 6. By iterating through all possible amounts (am) and coin denominations (coin), the dp array gradually gets filled with the minimum number of coins needed for each amount.
 *
 * 7. After the loops complete, the dp[amount] element in the array holds the minimum number of coins needed to make change for the target amount. We return the ans or -1.
 *
 * Time complexity: O(m * n), where m is the amount and n is the number of coins.
 *
 * Space complexity: O(m), where m is the amount.
 *
 */
const coinChange = (coins, amount) => {
  let dp = new Array(amount + 1).fill(Number.MAX_VALUE);
  dp[0] = 0;

  for (let am = 1; am < amount + 1; am++) {
    for (const coin of coins) {
      if (coin <= am) {
        dp[am] = Math.min(dp[am], dp[am - coin] + 1);
      }
    }
  }

  const ans = dp[amount];
  return ans === Number.MAX_VALUE ? -1 : ans;
};

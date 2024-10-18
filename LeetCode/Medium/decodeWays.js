/**
 * https://leetcode.com/problems/decode-ways/description/
 *
 * Top-Down Dynamic Programming Approach
 *
 * 1. We initialize a `memo` map to store previously calculated results for memoization (avoiding redundant calculations).
 *
 * 2. The base case: If i reaches the end of the string, it means a valid decoding is possible ending at that point. We return 1 in this case.
 *
 *
 * 3. Recursion Exploration:
 * - 3.1: We initialize a variable `ans` to store the total number of decodings found so far.
 * - 3.2: We have 2 cases need to be considered here: single digit and two digits decodings.
 *
 * 4. Single Digit Decoding:
 * - 4.1: If the current character (s[i]) is not a leading zero ('0'), we consider a decoding where this character is treated as a single digit. We then recursively call `dp(i + 1)` to explore decodings starting from the next index (i + 1).
 * - 4.2: And then, the result is added to `ans` variable.
 *
 * 5. Two Digit Decoding:
 * - 5.1: If i is not the last index (i + 1 < s.length) and the current character (s[i]) allows a valid two-digit combination:
 * - 5.1.1: We check if the two-digit combination (s[i] + s[i + 1]) is valid with 2 cases where the first digit is '1' (from 10 to 19) and the first digit is '2' (from 20 to 26).
 * - 5.1.2: And If the first digit is '2', the second digit (s[i + 1]) must be less than or equal to '6' for a valid combination (numbers 11 to 26).
 *
 * - 5.2: If the two-digit combination is valid, we recursively call `dp(i + 2)` to explore decodings starting from two characters ahead (i + 2). The result is added to ans.
 *
 * 6: After exploring both single and two-digit decodings, we return the final `ans` for the current index i.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(n)
 *
 */
const numDecodings = (s) => {
  const memo = {};
  let n = s.length;

  const dp = (i) => {
    if (memo[i]) return memo[i];

    // Base case
    if (i === n) return 1;

    let ans = 0;

    // Case 1: Single digit (1 -> 9)
    if (s[i] !== '0') {
      ans += dp(i + 1);
    }

    // Case 2: 2 digits (10 -> 26)
    if (i + 1 < n && (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))) {
      ans += dp(i + 2);
    }

    memo[i] = ans;
    return ans;
  };

  return dp(0);
};

/**
 *
 * Bottom-Up Dynamic Programming Approach
 *
 * Same idea with previous solution but different implementation
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(n)
 *
 */
const numDecodings = (s) => {
  const n = s.length;
  let dp = new Array(n + 1).fill(0);

  // Base case
  dp[n] = 1;

  for (let i = n - 1; i >= 0; i--) {
    // Case 1: Single digit (1 -> 9)
    if (s[i] !== '0') {
      dp[i] += dp[i + 1];
    }

    // Case 2: 2 digits (10 -> 26)
    if (i + 1 < n && (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))) {
      dp[i] += dp[i + 2];
    }
  }

  return dp[0];
};

/**
 *
 * Bottom-Up Dynamic Programming Approach
 *
 * Same idea with previous solution with space complexity optimization.abs
 *
 * Instead of using additional data structure to store the result, we use 2 variables to keep track of the result at each iteration
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(1)
 *
 */
const numDecodings = (s) => {
  const n = s.length;
  let dpPrev1 = 1;
  let dpPrev2 = 0;

  for (let i = n - 1; i >= 0; i--) {
    let dp = 0;

    // Case 1: Single digit (1 -> 9)
    if (s[i] !== '0') {
      dp += dpPrev1;
    }

    // Case 2: 2 digits (10 -> 26)
    if (i + 1 < n && (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))) {
      dp += dpPrev2;
    }

    [dpPrev1, dpPrev2] = [dp, dpPrev1];
  }

  return dpPrev1;
};

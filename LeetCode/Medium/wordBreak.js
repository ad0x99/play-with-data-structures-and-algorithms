/**
 * https://leetcode.com/problems/word-break/description/
 *
 * Top-Down Dynamic Programming Approach
 *
 * 1. We create a `memo` map to store the previously calculated results for memoization.
 *
 * 2. We convert the `wordDict` from an array to `Set` for faster lookups.
 *
 * 3. The `dp` function takes an index `i` in the string `s` as input and returns true if a valid word break is possible starting from that index, false otherwise.
 *
 * 3. Inside the dp function, we first check if the result for the current index i already exists in the `memo` map, we return the stored value directly (avoiding recalculation).
 *
 * 4. The base case: If the index `i` reaches the end of the string (i === n), it means a valid word break is possible by considering an empty string at the end. We return true in this case.
 *
 * 5. We iterate through all possible ending indices (`j`) from the current index `i` up to the end of the string.
 * - 5.1: We extract the substring word from the original string s starting at index `i` and ending at index `j` (not including j itself).
 *
 * - 5.2: We check if the extracted word exists in the wordSet, and the recursive call `dp(j + 1)` returns true (indicating a valid word break from the next index `j + 1`), it means a valid word break is possible starting from the current index `i`. In this case, we store `true` in the `memo` for the current index `i` and return `true`.
 *
 * 6. If no valid word break is found after iterating through all possible substrings, we store `false` in the `memo` for the current index `i` and return `false`.
 *
 * Time complexity: O(n * n * n) = O(n ^ 3)
 * - Iterating through each character in the string: O(n)
 * - Slicing the string: O(n)
 * - dp(i) run n times: O(n)
 *
 * Space complexity: O(n + m)
 * - Slicing the string: O(n)
 * - Word set: O(m)
 */
const wordBreak = (s, wordDict) => {
  const n = s.length;
  const memo = new Map();
  const wordSet = new Set(wordDict);

  const dp = (i) => {
    if (memo.has(i)) return memo.get(i);

    // Base case
    if (i === n) return true;

    // DP
    for (let j = 0; j < n; j++) {
      // Extract substring from i to j (not including j itself)
      let word = s.slice(i, j + 1);

      // If current word exists in the wordSet and
      // a valid word break from the next index `j + 1`, we return true
      if (wordSet.has(word) && dp(j + 1)) {
        memo.set(i, true);
        return true;
      }
    }

    memo.set(i, false);
    return false;
  };

  return dp(0);
};

/**
 *
 * Bottom-Up Dynamic Programming Approach
 *
 * 1. We create a `memo` map to store the previously calculated results for memoization.
 *
 * 2. We convert the `wordDict` from an array to `Set` for faster lookups.
 *
 * 3. We create a `dp` array of size `n + 1`.
 *
 * 4. The base case: we initialize the first element `dp[0]` with `true`. This represents the base case where an empty string can always be segmented (broken into no words).
 *
 * 5. Nested loop:
 * - 5.1: The outer loop iterates through all possible ending indices (`i`) from `1` (first character) to the end of the string (`n`).
 *
 * - 5.2: The inner loop iterates through all possible starting indices (`j`) from the beginning (`0`) to the current ending index (`i - 1`).
 *
 * 6. Inside the loops, we extract the substring word from the original string `s`.
 * - 6.1: We check if the extracted word exists in the wordSet, and the `dp[j]` is true (meaning a valid word break is possible up to the starting index `j`), it means a valid word break is possible ending at the current index `i`.
 *
 * - 6.2: In this case, we set `dp[i]` to `true` to indicate this possibility.
 *
 * - 6.3:We also break to exit early if a valid break is found for the current ending index `i`. This is because once a valid break is found, there's no need to explore further substrings starting before `j`.
 *
 * 7. After iterating through all possible ending indices, the final value in the dp array, `dp[n]`, represents whether a valid word break is possible for the entire string s. We return the value stored in `dp[n]`.
 *
 *
 * Time complexity: O(n ^ 2) - where n is the length of the string. Because for each position i, we check all possible substrings s[j..i], which takes O(i) time.
 *
 * Space complexity: O(n + m)
 * - DP array: O(n)
 * - Word set: O(m) - where m is the total number of characters in the word dictionary.
 */
const wordBreak = (s, wordDict) => {
  const n = s.length;
  const memo = new Map();
  const wordSet = new Set(wordDict);
  const dp = new Array(n + 1).fill(0);

  // Base case - an empty string can be segmented
  dp[0] = true;

  // DP
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const word = s.slice(j, i);

      if (wordSet.has(word) && dp[j]) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
};

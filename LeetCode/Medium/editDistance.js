/**
 * https://leetcode.com/problems/edit-distance/description/
 *
 * Bottom-Up Dynamic Programming Approach
 *
 * 1. We create 2 variables m and n to store the lengths of the input strings word1 and word2.
 *
 * 2. We create a dp array of size (m+1) x (n+1) where dp[i][j] will store the minimum number of operations needed to convert the first i characters of word1 into the first j characters of word2.
 *
 * 3. We iterate over each character of word1 and word2. There are 4 cases:
 * - 3.1: Case 1: If word1 is empty (i == 0), we need to insert j characters from word2 to convert word1 into word2. Thus, dp[0][j] = j.
 *
 * - 3.2: Case 2: If word2 is empty (j == 0), we need to delete all i characters of word1 to convert word1 into an empty string. Thus, dp[i][0] = i.
 *
 * - 3.3: Case 3: If the characters at the current positions of word1 and word2 are the same, no operation is needed. Therefore, we just inherit the value from dp[i - 1][j - 1].
 *
 * - 3.4: Case 4: If the characters are different, we take the minimum of three possible operations and add 1 to represent the current operation. The dp[i - 1][j] represents deletion of the current character from word1, the dp[i][j - 1] represents insertion of the current character from word2, and the dp[i - 1][j - 1] represents replacement of the character in word1 with the character from word2.
 *
 * 4. We return the dp[m][n], which stores the minimum operations to convert word1 to word2.
 *
 * Time complexity: O(m * n), where m is the length of word1 and n is the length of word2.
 *
 * Space complexity: O(m * n), because we use a 2D array of size (m+1) * (n+1).
 */
const minDistance = (word1, word2) => {
  const m = word1.length;
  const n = word2.length;

  // Create a 2D DP array to store the edit distances
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        // If word1 is empty, we need to insert all characters of word2
        dp[i][j] = j;
      } else if (j === 0) {
        // If word2 is empty, we need to delete all characters of word1
        dp[i][j] = i;
      } else if (word1[i - 1] === word2[j - 1]) {
        // If the characters are the same, no change is required
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // If the characters are different, take the minimum of insert, delete, or replace
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[m][n];
};

/**
 * https://leetcode.com/problems/shortest-common-supersequence/description/
 *
 * Dynamic Programming Approach
 *
 * Idea: First, we compute the LCS of the two strings. This is the longest sequence that appears in both str1 and str2 in the same order. The reason for finding the LCS is that it provides the foundation for the supersequence, helping to minimize redundant characters between str1 and str2.
 *
 * Once we know the LCS, we can construct the shortest common supersequence by merging the two strings, ensuring that we only include the characters outside the LCS once.
 *
 * Implementation
 *
 * 1. We first create a 2D dp table where dp[i][j] holds the length of the LCS for the first i characters of str1 and the first j characters of str2.
 *
 * 2. We iterate through both strings, comparing each character:
 * - 2.1: If str1[i-1] == str2[j-1], then they are part of the LCS, and we add 1 to the previous LCS length (dp[i-1][j-1]).
 *
 * - 2.2: Otherwise, we take the maximum of excluding either the current character from str1 (dp[i-1][j]) or str2 (dp[i][j-1]).
 *
 * 3. Backtrack: After computing the LCS, we use the dp table to backtrack and construct the shortest common supersequence.
 * - 3.1: For every character, if str1[i-1] equals str2[j-1], then it's part of the LCS, we add that character to the final SCS.
 *
 * - 3.2: Otherwise, If the characters are different, we add the character from the string that leads to the larger value in the DP table. This ensures we keep the LCS but also account for all characters in both strings.
 *
 * 4. After we finish backtracking, we may still have some characters left in either str1 or str2. We add those characters to the result because they are part of the final supersequence.
 *
 * Time complexity: O(m * n), where m is the length of str1, and n is the length of str2
 *
 * Space complexity: O(m * n), size of DP
 */
const shortestCommonSupersequence = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;

  // Find the longest common subsequence
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If the current characters match
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Build the SCS using the LCS
  let i = m;
  let j = n;
  let scs = '';

  while (i > 0 && j > 0) {
    // If characters match, include them in the SCS
    if (str1[i - 1] === str2[j - 1]) {
      scs = str1[i - 1] + scs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      // Include character from str1 and move up in the DP table
      scs = str1[i - 1] + scs;
      i--;
    } else {
      // Include character from str2 and move left in the DP table
      scs = str2[j - 1] + scs;
      j--;
    }
  }

  // Add the remaining characters from str1 and str2 if any
  while (i > 0) {
    scs = str1[i - 1] + scs;
    i--;
  }
  while (j > 0) {
    scs = str2[j - 1] + scs;
    j--;
  }

  return scs;
};

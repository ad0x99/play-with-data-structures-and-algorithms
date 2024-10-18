/**
 * https://leetcode.com/problems/longest-common-subsequence/description/
 *
 * Dynamic Programming Approach
 *
 * Implementation
 *
 * 1. We create m and n to store the lengths of text1 and text2, respectively.
 *
 * 2. We initialize a 2D dynamic programming array `dp`, where `dp[i][j]` will represent the LCS length of `text1[0..i-1]` and `text2[0..j-1]`. It's filled with zeros, representing the base case where no characters from either string are used (empty string comparison).
 *
 * 3. We iterate over each character of text1 and text2 using two nested loops (one for each string). At each iteration, we compare the current character at text1 (`text1[i-1]`) and the current character at text2 (`text2[j-1]`). There are two possibilities:
 * - 3.1: Characters match: If `text1[i-1] === text2[j-1]`, it means that adding these characters extends the LCS by 1. So, `dp[i][j] = dp[i-1][j-1] + 1`.
 *
 * - 3.2: Characters do not match: If the characters don’t match, we take the maximum value from either excluding the current character of text1 (`dp[i-1][j]`) or excluding the current character of text2 (`dp[i][j-1]`). This step ensures that we find the LCS by considering either or both strings without their current character.
 *
 * 4. After filling the dp table, the value in `dp[m][n]` represents the length of the LCS for text1 and text2.
 *
 * Time complexity: O(m * n), where m is the number of characters of text1, and n is the number of characters of text2.
 *
 * Space complexity: O(m * n)
 */
const longestCommonSubsequence = (text1, text2) => {
  const m = text1.length;
  const n = text2.length;

  // Create a 2D vector dp with (m+1) rows and (n+1) columns filled with 0
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If the current characters in both strings match
      if (text1[i - 1] === text2[j - 1]) {
        // The length of the LCS for the current substrings is one more than the LCS for the previous substrings
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // Take the maximum of the LCS for the previous substrings
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Return the length of the longest common subsequence
  return dp[m][n];
};

/**
 * Find the longest common subsequence and return the substring.
 */
const longestCommonSubsequencePath = (text1, text2) => {
  const [m, n] = [text1.length, text2.length];
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  let i, j;

  for (i = 1; i < m + 1; i++) {
    for (j = 1; j < n + 1; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Trace back the longest common subsequence
  i = m;
  j = n;
  const commonSubsequence = [];
  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      commonSubsequence.push(text1[i - 1]);
      i -= 1;
      j -= 1;
    } else if (dp[i][j] === dp[i - 1][j]) {
      i -= 1;
    } else {
      j -= 1;
    }
  }

  return commonSubsequence.reverse().join('');
};

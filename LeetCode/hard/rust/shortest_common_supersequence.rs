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
impl Solution {
    pub fn shortest_common_supersequence(str1: String, str2: String) -> String {
        let m = str1.len();
        let n = str2.len();
        let str1_chars: Vec<char> = str1.chars().collect();
        let str2_chars: Vec<char> = str2.chars().collect();

        // Find the longest common subsequence
        let mut dp = vec![vec![0; n + 1]; m + 1];
        for i in 1..=m {
            for j in 1..=n {
                if str1_chars[i - 1] == str2_chars[j - 1] {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = dp[i - 1][j].max(dp[i][j - 1])
                }
            }
        }

        // Build the SCS using the LCS
        let mut i = m;
        let mut j = n;
        let mut scs = String::new();
        while i > 0 && j > 0 {
            if str1_chars[i - 1] == str2_chars[j - 1] {
                // If characters match, include them in the SCS
                scs.insert(0, str1_chars[i - 1]);
                i -= 1;
                j -= 1;
            } else if dp[i - 1][j] > dp[i][j - 1] {
                // Include character from str1 and move up in the DP table
                scs.insert(0, str1_chars[i - 1]);
                i -= 1;
            } else {
                // Include character from str2 and move left in the DP table
                scs.insert(0, str2_chars[j - 1]);
                j -= 1;
            }
        }

        // Add the remaining characters from str1 and str2 if any
        while i > 0 {
            scs.insert(0, str1_chars[i - 1]);
            i -= 1;
        }
        while j > 0 {
            scs.insert(0, str2_chars[j - 1]);
            j -= 1;
        }

        scs
    }
}

use std::collections::{HashMap, HashSet};

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
impl Solution {
    pub fn word_break(s: String, word_dict: Vec<String>) -> bool {
        let n = s.len();
        let word_set: HashSet<String> = word_dict.into_iter().collect();
        let mut memo: HashMap<usize, bool> = HashMap::new();

        fn dp(
            i: usize,
            s: &str,
            n: usize,
            word_set: &HashSet<String>,
            memo: &mut HashMap<usize, bool>,
        ) -> bool {
            if let Some(&res) = memo.get(&i) {
                res;
            }

            if i == n {
                return true;
            }

            for j in i + 1..=n {
                let word = &s[i..j];

                if word_set.contains(word) && dp(j, s, n, word_set, memo) {
                    memo.insert(i, true);
                    return true;
                }
            }

            memo.insert(i, false);
            return false;
        }

        dp(0, &s, n, &word_set, &mut memo)
    }
}

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
impl Solution {
    pub fn word_break(s: String, word_dict: Vec<String>) -> bool {
        let n = s.len();
        let word_set: HashSet<String> = word_dict.into_iter().collect();
        let mut dp = vec![false; n + 1];

        // Base case - an empty string can be segmented
        dp[0] = true;

        // DP
        for i in 1..=n {
            for j in 0..=i {
                let word = &s[j..i];

                if word_set.contains(word) && dp[j] {
                    dp[i] = true;
                    break;
                }
            }
        }

        dp[n]
    }
}

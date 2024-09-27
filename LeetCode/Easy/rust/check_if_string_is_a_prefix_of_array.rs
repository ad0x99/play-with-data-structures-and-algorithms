/**
 * https://leetcode.com/problems/check-if-string-is-a-prefix-of-array/
 *
 * Prefix Matching Approach
 *
 * Idea: Find k word and concatenate them all together such that the concatenated word is equal to the s.
 *
 * Implementation
 *
 * 1. We initialize a prefix to store the concatenated string from words array.
 *
 * 2. As long as the current index is not out of the length of the words array and the length of prefix is less than or equal to length of string s, we continue the loop.
 * 
 * 3. Each iteration, we concatenate the prefix with the current word from words array.
 *
 * 4. If the string prefix is equal to the string s, we return true.
 *
 * 5. After iterating all the words, if there is no prefix that match with string s, we return false.
 *
 * Time complexity: O(n) + O(m) = O(n), where m is the number of words in the words, and n is the total length of all strings in the words.
 *
 * Space complexity: O(n), where n is the length of string prefix.
 */
impl Solution {
    pub fn is_prefix_string(s: String, words: Vec<String>) -> bool {
        let mut prefix = String::new();
        let mut i = 0;

        while i < words.len() && prefix.len() <= s.len() {
            // Concatenate the current word to the prefix
            prefix.push_str(&words[i]);

            // Check if the prefix matches `s`
            if prefix == s {
                return true;
            }

            i += 1
        }

        false
    }
}

/**
 * https://leetcode.com/problems/longest-common-prefix/description/
 *
 * Prefix Matching Approach
 *
 * Implementation
 *
 * 1. We initialize a pointer `i` to track the position in the prefix.
 *
 * 2. We initialize a infinite loop to iterate through each string in `strs` and checks if the i-th character of all strings is the same.
 *
 * 3. If `i` exceeds the length of any string or if characters at position `i` do not match, we return the common prefix found so far. The slice(0, i) returns the substring from the beginning of the string up to i.
 *
 * Time complexity: O(m * n), where n is the number of strings, and m is the length of the shortest string.
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        if strs.is_empty() {
            return "".to_string();
        }

        let mut char_idx = 0;
        loop {
            for i in 0..strs.len() {
                let first_str = &strs[0];
                let current_str = &strs[i];

                // If we reach the end of any string or the characters don't match, return the prefix
                if char_idx >= first_str.len()
                    || char_idx >= current_str.len()
                    || first_str.as_bytes()[char_idx] != current_str.as_bytes()[char_idx]
                {
                    return first_str[..char_idx].to_string();
                }
            }

            char_idx += 1;
        }
    }
}

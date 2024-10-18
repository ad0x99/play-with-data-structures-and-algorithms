/**
 * https://leetcode.com/problems/longest-palindromic-substring/description/
 *
 * Two Pointer Approach
 *
 * Idea: At each i-th position, we expand to the left and right accordingly and keep track the longest palindrome. There are 2 scenarios where the string is odd and even, we need to make sure that we expand for both cases to get the correct palindrome.
 *
 * Implementation
 *
 * 1. We create 2 variables left and right to keep track of the indices of the longest palindromic substring found.
 *
 * 2. The `expand` function checks for the longest palindrome centered around the index i for odd-length palindromes (expand(i, i)) and around indices i and i + 1 for even-length palindromes (expand(i, i + 1)).
 * - 2.1: We use two pointers, i and j, to expand outward while the characters at the current i and j are the same.
 *
 * - 2.2: If a longer palindrome is found, we update the left and right to keep track the longest palindrome.
 *
 * 3. In the main loop, we iterate over each character in the string s, calling expand to check for both odd and even-length palindromes starting from that position.
 *
 * 4. After the loop, we return the substring s[left:right + 1], which is the longest palindrome found.
 *
 * Time complexity: O(n ^ 2), where n is the number of characters in the string s.
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn longest_palindrome(s: String) -> String {
        // Convert string to char vector
        let s_chars: Vec<char> = s.chars().collect();
        let mut left = 0;
        let mut right = 0;

        // Expand around the center
        fn expand(s: &Vec<char>, mut i: isize, mut j: isize, left: &mut usize, right: &mut usize) {
            while i >= 0 && j < s.len() as isize && s[i as usize] == s[j as usize] {
                if (j - i) as usize > *right - *left {
                    *left = i as usize;
                    *right = j as usize;
                }
                i -= 1;
                j += 1;
            }
        }

        for i in 0..s.len() {
            // Odd length palindrome
            expand(&s_chars, i as isize, i as isize, &mut left, &mut right);
            // Even length palindrome
            expand(&s_chars, i as isize, i as isize + 1, &mut left, &mut right);
        }

        // Return the longest palindrome substring
        s_chars[left..=right].iter().collect()
    }
}

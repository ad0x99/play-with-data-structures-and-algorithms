/**
 * https://leetcode.com/problems/valid-palindrome/description/
 *
 * Two Pointer Approach
 *
 * Idea:
 * - Convert the string to lowercase and remove all non-alphanumeric characters.
 * - Use two pointers and iterate from the start and end of the string to check palindrome at each character.
 *
 * Time complexity: O(3n) = O(n)
 * - Convert string to lowercase: O(n)
 * - Remove non-alphanumeric characters: O(n)
 * - Loop: O(n)
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn is_palindrome(s: String) -> bool {
        // Convert to lowercase and retain only alphanumeric characters
        let s: Vec<char> = s
            .to_lowercase()
            .chars()
            .filter(|c| c.is_ascii_alphanumeric())
            .collect();

        // Use two pointers to check if the string is a palindrome
        let mut left = 0;
        let mut right = s.len() as isize - 1;

        while left < right {
            if s[left as usize] != s[right as usize] {
                return false;
            }
            left += 1;
            right -= 1;
        }

        true
    }
}

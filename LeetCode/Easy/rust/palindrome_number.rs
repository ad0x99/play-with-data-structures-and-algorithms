/**
 * https://leetcode.com/problems/palindrome-number/description/
 *
 * Brute Force Approach
 *
 * Idea: A palindrome is a word, number, phrase, or sequence of characters that reads the same forward and backward, ignoring spaces, punctuation, and capitalization. Essentially, a palindrome remains unchanged in its meaning or structure when reversed.
 *
 * Based on this definition, we're going to convert the original number to string and compare with its reversed version for palindrome checking.
 *
 * Time complexity: O(n), where n is the number of digits in the number x
 *
 * Space complexity: O(n)
 */
impl Solution {
    pub fn is_palindrome(x: i32) -> bool {
        // Negative numbers are not palindromes
        if x < 0 {
            return false;
        }
        // 0 is a palindrome
        if x == 0 {
            return true;
        }

        let original = x.to_string();
        let reversed: String = original.chars().rev().collect();

        original == reversed
    }
}

/**
 * Two Pointer Approach
 *
 * Idea: The same approach as previous one, but instead of slicing and reversing the string x, we're using 2 pointers which the left one starts from the first of the string, and the right one starts from the end of the string.
 *
 * Each time we're iterating through each digit, we'll compare the left and right digit accordingly for palindrome checking.
 *
 * This solution is more optimized in term of the space complexity due to we're not using additional spaces.
 *
 * Time complexity: O(n), where n is the number of digits in the number x
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn is_palindrome(x: i32) -> bool {
        // Negative numbers are not palindromes
        if x < 0 {
            return false;
        }
        // 0 is a palindrome
        if x == 0 {
            return true;
        }

        let x_str = x.to_string();
        let mut left = 0;
        let mut right = x_str.len() - 1;
        let x_chars: Vec<char> = x_str.chars().collect();

        while left < right {
            if x_chars[left] != x_chars[right] {
                return false;
            }

            left += 1;
            right -= 1;
        }

        true
    }
}

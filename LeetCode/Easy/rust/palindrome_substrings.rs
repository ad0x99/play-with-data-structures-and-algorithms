/**
 * https://leetcode.com/problems/palindromic-substrings/description/
 *
 * Two Pointer Approach
 *
 * Idea: At each i-th position, we expand to the left and right accordingly and keep track the count of palindrome found at each substring. There are 2 scenarios where the string is odd and even, we need to make sure that we expand for both cases to get the correct palindrome.
 *
 * At each position, we expand to the left and right and count the number of palindrome substring. The total palindrome substring is equal to the total palindrome of the odd and even substring at each position.
 *
 * Time complexity: O(n ^ 2), where n is the number of characters in the string s.
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn count_substrings(s: String) -> i32 {
        // Convert string to char vector
        let s_chars: Vec<char> = s.chars().collect();

        // Expand around the center
        fn expand(s: &Vec<char>, mut left: isize, mut right: isize) -> i32 {
            let mut count = 0;
            while left >= 0 && right < s.len() as isize && s[left as usize] == s[right as usize] {
                count += 1;
                left -= 1;
                right += 1;
            }

            count
        }

        let mut total_count = 0;
        for i in 0..s.len() {
            // Odd length palindrome
            let odd_count = expand(&s_chars, i as isize, i as isize);
            // Even length palindrome
            let even_count = expand(&s_chars, i as isize, i as isize + 1);
            // Update total count of palindrome substring found
            total_count += odd_count + even_count;
        }

        total_count
    }
}

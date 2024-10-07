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
const longestPalindrome = (s) => {
  let left = 0;
  let right = 0;

  // Expand to the left and right of from current position
  const expand = (i, j) => {
    while (i >= 0 && j < s.length && s[i] === s[j]) {
      // If longer palindrome found, update the left and right bounds
      if (j - i > right - left) {
        left = i;
        right = j;
      }

      i--;
      j++;
    }
  };

  for (let i = 0; i < s.length; i++) {
    // Odd length palindrome
    expand(i, i);
    // Even length palindrome
    expand(i, i + 1);
  }

  // Return the longest palindrome substring
  return s.substring(left, right + 1);
};

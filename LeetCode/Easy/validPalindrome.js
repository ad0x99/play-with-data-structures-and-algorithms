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
const isPalindrome = (s) => {
  // Convert to lowercase and retain only alphanumeric characters
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Use two pointers to check if the string is a palindrome
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left += 1;
    right -= 1;
  }

  return true;
};

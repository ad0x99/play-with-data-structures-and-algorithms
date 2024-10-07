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
const isPalindrome = (x) => {
  // Negative numbers are not palindromes
  if (x < 0) return false;
  // 0 is a palindrome
  if (x === 0) return true;

  const original = x.toString();
  const reversed = x.toString().split('').reverse().join('');
  return original === reversed;
};

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
const isPalindrome = (x) => {
  // Negative numbers are not palindromes
  if (x < 0) return false;
  // 0 is a palindrome
  if (x === 0) return true;

  x = x.toString();
  let left = 0;
  let right = x.length - 1;

  while (left < right) {
    if (x[left] !== x[right]) {
      return false;
    }

    left += 1;
    right -= 1;
  }

  return true;
};

/**
 * https://leetcode.com/problems/reverse-string/description/
 *
 * The idea is to using 2 pointers to swap position of the left and the right for reversing.
 *
 * 1. We initialize the left starts from 0 and right starts from the end of the array
 * 2. As long as the left is less than the right
 * 3. We swap the left and the right positions
 * 4. We increase the left and decrease the right to swap the next letters
 *
 * The time complexity of this function is O(n) where n is the length of the input string. This is because the function iterates through half of the string (from the beginning and end simultaneously) and swaps the characters, resulting in a linear time complexity.
 *
 * The space complexity of this function is O(1) because the function only uses a constant amount of extra space regardless of the size of the input string. This is because the function does not create any additional data structures that grow with the input size.
 */
const reverseString = (s) => {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Swap position of left and right
    [s[left], s[right]] = [s[right], s[left]];
    left += 1;
    right -= 1;
  }

  return s;
};

const str1 = ['h', 'e', 'l', 'l', 'o'];
const str2 = ['H', 'a', 'n', 'n', 'a', 'h'];
console.log(reverseString(str1)); // ["o","l","l","e","h"]
console.log(reverseString(str2)); // ["h","a","n","n","a","H"]

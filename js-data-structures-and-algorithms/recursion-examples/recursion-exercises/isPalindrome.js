/**
 * Write a recursive function called isPalindrome which returns true if the string passed to it is a palindrome (reads the same forward and backward). Otherwise it returns false.
 * For examples:
 * isPalindrome('awesome') // false
 * isPalindrome('foobar') // false
 * isPalindrome('tacocat') // true
 * isPalindrome('amanaplanacanalpanama') // true
 * isPalindrome('amanaplanacanalpandemonium') // false
 */

/**
 * The function checks if a given string is a palindrome using recursion.
 * @param str - The input string that we want to check if it is a palindrome or not.
 * @returns The function `isPalindrome` returns a boolean value - `true` if the input string is a
 * palindrome (reads the same forwards and backwards), and `false` otherwise.
 */
const isPalindrome = (str) => {
  if (str.length === 1) return true;
  if (str.length <= 2) return str[0] === str[1];

  /* This line of code checks if the first character of the string is equal to the last character of
  the string. If they are equal, it calls the `isPalindrome` function recursively with the string
  sliced from the second character to the second-to-last character. This process continues until the
  string length is 1 or 0, at which point the function returns true. If the first and last
  characters are not equal, the function returns false. */
  if (str[0] === str.slice(-1)) return isPalindrome(str.slice(1, -1));
  return false;
};

console.log(isPalindrome('awesome'));
console.log(isPalindrome('foobar'));
console.log(isPalindrome('tacocat'));
console.log(isPalindrome('amanaplanacanalpanama'));
console.log(isPalindrome('amanaplanacanalpandemonium'));

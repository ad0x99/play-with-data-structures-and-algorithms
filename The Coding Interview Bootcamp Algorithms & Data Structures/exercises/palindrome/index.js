// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false

// Solution 1
/**
 * If the string is the same as the string reversed, then it's a palindrome
 * @param str - the string to be checked
 * @returns true
 */
const palindrome = (str) => {
  return str.split('').reverse().join('') === str;
};

// Solution 2
/**
 * We split the string into an array of characters, then we loop through each character and compare it
 * to its mirror character on the other side of the array
 * @param str - the string we're checking
 * @returns a boolean value.
 */
const palindrome2 = (str) => {
  return str.split('').every((char, index) => {
    return char === str[str.length - index - 1];
  });
};

module.exports = { palindrome, palindrome2 };

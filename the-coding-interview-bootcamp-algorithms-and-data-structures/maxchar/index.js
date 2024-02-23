// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

// Solution 1
/**
 * We loop through the string, adding each character to an object as a key, and incrementing the value
 * each time we see that character. Then we loop through the object, checking if the value of each key
 * is greater than the max. If it is, we set the max to that value, and set the maxChar to that key
 * @param str - the string we're going to be searching through
 * @returns The character that appears the most in the string.
 */
const maxChar = (str) => {
  const chars = {};
  let max = 0;
  let maxChar = '';

  for (const char of str) {
    chars[char] = chars[char] + 1 || 1;
  }

  for (const char in chars) {
    if (chars[char] > max) {
      max = chars[char];
      maxChar = char;
    }
  }

  return maxChar;
};

// Solution 2
/**
 * We loop through the string, and for each character, we check if it's already in the object. If it
 * is, we increment the count. If it isn't, we set the count to 1. Then we loop through the object and
 * find the character with the highest count
 * @param str - the string we're going to be searching through
 * @returns The most frequently used character in the string.
 */
const maxChar2 = (str) => {
  const chars = {};
  let max = 0;
  let maxChar = '';

  for (const char of str) {
    if (!chars[char]) {
      chars[char] = 1;
    } else {
      chars[char]++;
    }
  }

  for (const char in chars) {
    if (chars[char] > max) {
      max = chars[char];
      maxChar = char;
    }
  }

  return maxChar;
};

module.exports = maxChar;

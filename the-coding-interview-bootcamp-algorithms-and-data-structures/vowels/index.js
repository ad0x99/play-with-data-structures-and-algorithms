// --- Directions
// Write a function that returns the number of vowels
// used in a string.  Vowels are the characters 'a', 'e'
// 'i', 'o', and 'u'.
// --- Examples
//   vowels('Hi There!') --> 3
//   vowels('Why do you ask?') --> 4
//   vowels('Why?') --> 0

// Solution 1
/**
 * We take a string, convert it to lowercase, split it into an array of characters, filter out the
 * characters that are not vowels, and return the length of the resulting array
 * @param str - The string to be evaluated.
 * @returns The number of vowels in the string.
 */
const vowels = (str) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const count = str
    .toLowerCase()
    .split('')
    .filter((char) => vowels.includes(char)).length;

  return count;
};

// Solution 2
/**
 * We loop through each character in the string, and if the character is a vowel, we increment the
 * count
 * @param str - the string to count the vowels in
 * @returns The number of vowels in the string.
 */
const vowels2 = (str) => {
  const vowels = 'aeiou';
  let count = 0;

  for (const char of str.toLowerCase()) {
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
};

// Solution 3
/**
 * It takes a string as an argument, and returns the number of vowels in that string
 * @param str - the string to search for vowels
 * @returns The number of vowels in the string.
 */
const vowels3 = (str) => {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
};

export { vowels };

// --- Directions
// Write a function that accepts a string.  The function should
// capitalize the first letter of each word in the string then
// return the capitalized string.
// --- Examples
//   capitalize('a short sentence') --> 'A Short Sentence'
//   capitalize('a lazy fox') --> 'A Lazy Fox'
//   capitalize('look, it is working!') --> 'Look, It Is Working!'

// Solution 1
/**
 * We split the string into an array of words, then we iterate over each word, capitalize the first
 * letter, and push the word into a new array. Finally, we join the array of words back into a string
 * @param str - The string to capitalize.
 * @returns the capitalized version of the string.
 */
const capitalize = (str) => {
  const arrayString = str.split(' ');
  const capitalized = [];

  for (const char of arrayString) {
    capitalized.push(`${char.slice(0, 1).toUpperCase()}${char.slice(1)}`);
  }

  return capitalized.join(' ');
};

// Solution 2
/**
 * We start with the first letter capitalized, and then we iterate through the rest of the string,
 * capitalizing the letter after a space
 * @param str - the string to capitalize
 * @returns the capitalized string.
 */
const capitalize2 = (str) => {
  let capitalized = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      capitalized += str[i].toUpperCase();
    } else {
      capitalized += str[i];
    }
  }

  return capitalized;
};

module.exports = capitalize;

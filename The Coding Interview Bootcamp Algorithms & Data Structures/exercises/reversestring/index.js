// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

// Solution 1
/**
 * We split the string into an array, reverse the array, and then join the array back into a string
 * @param str - The string to be reversed
 * @returns The reverse of the string
 */
const reverse = (str) => {
  const arr = str.split('');
  arr.reverse();
  return arr.join('');
};

// Solution 2
/**
 * We loop through the string and push each character to the beginning of the reversedStr variable
 * @param str - The string to be reversed
 * @returns The reversed string
 */
const reverse2 = (str) => {
  let reversedStr = '';

  for (const st of str) {
    if (st.length > 0) {
      reversedStr = st + reversedStr;
    }
  }
  return reversedStr;
};

// Solution 3
/**
 * We split the string into an array of characters, then we reduce the array into a string, and we add
 * each character to the beginning of the string
 * @param str - the string to be reversed
 * @returns the reversed string.
 */
const reverse3 = (str) => {
  return str.split('').reduce((rev, char) => char + rev, '');
};

module.exports = { reverse, reverse2, reverse3 };

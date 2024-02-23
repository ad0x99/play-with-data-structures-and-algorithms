// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

// Solution 1

/**
 * We convert the number to a string, split it into an array, filter out any zeros, reverse the array,
 * join it back into a string, and then convert it back to a number
 * @param n - the number to be reversed
 * @returns the reversed integer.
 */
const reverseInt = (n) => {
  const isPositiveNumber = Math.sign(n) === 1;
  const isNegativeNumber = Math.sign(n) === -1;
  const reversedInt = parseInt(n.toString().split('').reverse().join(''));

  return isPositiveNumber ? reversedInt : isNegativeNumber ? -reversedInt : n;
};

// Solution 2
/**
 * We convert the number to a string, split it into an array, reverse the array, join the array back
 * into a string, and then convert it back to a number
 * @param n - the number to be reversed
 * @returns The reversed integer.
 */
const reverseInt2 = (n) => {
  const reversedInt = parseInt(n.toString().split('').reverse().join(''));

  return n < 0 ? reversedInt * -1 : reversedInt;
};

export { reverseInt };

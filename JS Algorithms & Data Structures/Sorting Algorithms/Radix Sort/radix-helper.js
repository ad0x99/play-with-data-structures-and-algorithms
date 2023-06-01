/**
 * The function returns the digit at a specified index in a given number.
 * @param num - The number from which we want to extract a digit.
 * @param index - The index parameter in the getDigit function refers to the position of the digit that
 * we want to extract from the given number. For example, if the index is 0, we want to extract the
 * rightmost digit of the number, if the index is 1, we want to extract the second
 * @returns The function `getDigit` takes two parameters: `num` and `index`. It returns the digit at
 * the given `index` position of the absolute value of `num`.
 */

export const getDigit = (num, index) => {
  /* `Math.abs(num)` returns the absolute value of `num`, which means it returns the
  positive value of `num` regardless of its original sign. `Math.pow(10, index)`
  returns 10 raised to the power of `index`. Dividing `Math.abs(num)` by
  `Math.pow(10, index)` gives us a number with the decimal point shifted to the
  left by `index` places. For example, if `num` is 12345 and `index` is 2,
  `Math.abs(num) / Math.pow(10, index)` would give us 123.45. The `Math.floor`
  function then rounds down this number to the nearest integer, and the `% 10`
  operator returns the remainder when this number is divided by 10, which gives us
  the digit at the specified index. */
  return Math.floor(Math.abs(num) / Math.pow(10, index)) % 10;
};

console.log('=====getDigit=====');
console.log(getDigit(12345, 0)); // 5
console.log(getDigit(12345, 1)); // 4
console.log(getDigit(12345, 2)); // 3
console.log(getDigit(12345, 3)); // 2
console.log(getDigit(12345, 4)); // 1
console.log(getDigit(12345, 5)); // 0
console.log('=====getDigit=====');

/**
 * The `digitCount` function returns the number of digits in a given number.
 * @param num - The input number for which the function `digitCount` calculates the number of digits.
 * @returns The `digitCount` function returns the number of digits in a given number.
 */
export const digitCount = (num) => {
  if (num === 0) return 1;
  /* `Math.abs(num)` returns the absolute value of `num`, which means it returns the positive value of
  `num` regardless of its original sign. `Math.log10(Math.abs(num))` returns the logarithm of `num`
  to base 10. This gives us the number of digits in `num` minus one. Adding 1 to this value gives us
  the total number of digits in `num`. Finally, `Math.floor` rounds down this value to the nearest
  integer and returns it. Therefore, `digitCount` function returns the number of digits in a given
  number. */
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

console.log('=====digitCount=====');
console.log(digitCount(1)); // 1
console.log(digitCount(25)); // 2
console.log(digitCount(314)); // 3
console.log('=====digitCount=====');

/**
 * The function "mostDigits" returns the maximum number of digits in an array of numbers.
 * @param arrayOfNumbers - an array of numbers for which we want to find the maximum number of digits
 * among all the numbers in the array.
 * @returns The function `mostDigits` is returning the maximum number of digits among all the numbers
 * in the input array `arrayOfNumbers`.
 */
export const mostDigits = (arrayOfNumbers) => {
  let maxDigits = 0;

  for (let i = 0; i < arrayOfNumbers.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(arrayOfNumbers[i]));
  }

  return maxDigits;
};

console.log('=====mostDigits=====');
console.log(mostDigits([1234, 56, 7])); // 4
console.log(mostDigits([1, 1, 11111, 1])); // 5
console.log(mostDigits([12, 34, 56, 78])); // 2
console.log('=====mostDigits=====');

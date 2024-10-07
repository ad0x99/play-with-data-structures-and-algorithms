/**
 * The function returns the digit at a specified index in a given number.
 *
 * 1. `Math.abs(num)` returns the absolute value of `num`, which means it returns the positive value of `num` regardless of its original sign.
 * 2. `Math.pow(10, index)` returns 10 raised to the power of `index`.
 * 3. Dividing `Math.abs(num)` by `Math.pow(10, index)` gives us a number with the decimal point shifted to the left by `index` places.
 *
 * For example: num = 12345, index = 2
 *
 * - `Math.abs(num) / Math.pow(10, index)` would give us 123.45
 * - The `Math.floor` function then rounds down this number to the nearest integer, and the `% 10` operator returns the remainder when this number is divided by 10, which gives us the digit at the specified index (3).
 *
 */

export const getDigit = (num, index) => {
  return Math.floor(Math.abs(num) / Math.pow(10, index)) % 10;
};

// console.log('=====getDigit=====');
// console.log(getDigit(12345, 0)); // 5
// console.log(getDigit(12345, 1)); // 4
// console.log(getDigit(12345, 2)); // 3
// console.log(getDigit(12345, 3)); // 2
// console.log(getDigit(12345, 4)); // 1
// console.log(getDigit(12345, 5)); // 0
// console.log('=====getDigit=====');

/**
 * The `digitCount` function returns the number of digits in a given number.
 *
 * 1. `Math.abs(num)` returns the absolute value of `num`, which means it returns the positive value of `num` regardless of its original sign.
 * 2. `Math.log10(Math.abs(num))` returns the logarithm of `num` to base 10. This gives us the number of digits in `num` minus one. Adding 1 to this value gives us the total number of digits in `num`.
 * 3. Finally, `Math.floor` rounds down this value to the nearest integer and returns it.
 *
 */
export const digitCount = (num) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

// console.log('=====digitCount=====');
// console.log(digitCount(1)); // 1
// console.log(digitCount(25)); // 2
// console.log(digitCount(314)); // 3
// console.log('=====digitCount=====');

/**
 * The function "mostDigits" returns the maximum number of digits in an array of numbers.
 */
export const mostDigits = (arrayOfNumbers) => {
  let maxDigits = 0;

  for (let i = 0; i < arrayOfNumbers.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(arrayOfNumbers[i]));
  }

  return maxDigits;
};

// console.log('=====mostDigits=====');
// console.log(mostDigits([1234, 56, 7])); // 4
// console.log(mostDigits([1, 1, 11111, 1])); // 5
// console.log(mostDigits([12, 34, 56, 78])); // 2
// console.log('=====mostDigits=====');

/**
 * This function extracts the digit at a specific position
 *
 * 1. The `Math.pow(10, k)` calculates `10` raised to the power of `k`. This essentially creates a base value based on the desired digit position. For example, if k is 0 (least significant digit), this value becomes 10^0 (1).
 * 2. The `value / Math.pow(10, k)` divides the input value by the calculated base value. This effectively removes all digits to the right of the `kth` digit position from value.
 * 3. The `% 10` performs a modulo operation on the result of the division. This extracts the remainder after dividing by 10. Since the base value is a power of 10, the remainder represents the digit at the `kth` position in the original value.
 * 4. The `Math.floor` ensures that any decimal part resulting from the division (e.g., if k is larger than the number of digits in value) is removed. This ensures we get the integer digit value at the `kth` position.
 * 5. The function returns the extracted digit, which is the remainder after division by 10 and flooring the result.
 */
export const getKthDigit = (value, k) => {
  return Math.floor((value / Math.pow(10, k)) % 10);
};

/**
 * This function calculates the number of digits present in a non-negative integer value
 *
 * 1. If the value is less than `10` (single-digit number), the function immediately returns 1. This is the simplest case, where a single-digit number has only `1` digit.
 * 2. The `Math.log10(value)` calculates the `base-10` logarithm of value. This represents the power to which `10` must be raised to get value.
 * 3. The `Math.floor` ensures we get the integer part of the result, discarding any fractional component from the logarithm.
 * 4. Since the logarithm represents the number of times `10` needs to be multiplied to reach value, adding `1` to the logarithm gives us the number of digits in value.
 *
 * For example, for value = 123, the logarithm is Math.log10(123) ≈ 2.09, and adding 1 gives us 3 (correct number of digits: 1, 2, 3).
 */
export const countNumOfDigits = (value) => {
  if (value < 10) return 1;
  return Math.floor(Math.log10(value)) + 1;
};

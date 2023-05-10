/**
 * Write a function called power which accepts a base and an exponent.
 * The function should return the power of the base to the exponent.
 * This function should mimic the functionality of Math.pow()  - do not worry about negative bases and exponents.
 * Example:
 * power(2,0) // 1
 * power(2,2) // 4
 * power(2,4) // 16
 */

/**
 * The function calculates the power of a given base raised to a given exponent using recursion.
 * @param base - The base parameter is the number that will be multiplied by itself exponent number of
 * times.
 * @param exponent - The exponent parameter in the power function represents the power to which the
 * base is raised. For example, in the expression 2^3, the base is 2 and the exponent is 3.
 * @returns The function `power` returns the result of raising the `base` to the power of `exponent`.
 * If `exponent` is 0, the function returns 1. Otherwise, it recursively calls itself with the
 * `exponent` decremented by 1 until `exponent` is 0.
 */
const power = (base, exponent) => {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
};

console.log(power(2, 0));
console.log(power(2, 2));
console.log(power(2, 4));

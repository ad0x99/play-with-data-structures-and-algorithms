/**
 * https://leetcode.com/problems/sqrtx/
 * The function calculates the square root of a given number using a for loop and returns the result.
 * @param x - The input number for which we want to find the square root.
 * @returns The function `mySqrt` returns the square root of the input `x` as an integer. If `x` is
 * less than or equal to 1, it returns `x`. Otherwise, it uses a loop to check if the square of each
 * number from 2 to `x` is equal to `x`. If it finds a number whose square is equal to `x`, it
 *
 * Time complexity: O(log n)
 * Space complexity: O(1)
 */
const mySqrt = function (x) {
  if (x <= 1) {
    return x;
  }

  for (let i = 2; i <= x; i++) {
    if (i * i === x) {
      return i;
    }

    if (i * i > x) {
      return i - 1;
    }
  }
};

console.log(mySqrt(2));
console.log(mySqrt(4));
console.log(mySqrt(8));

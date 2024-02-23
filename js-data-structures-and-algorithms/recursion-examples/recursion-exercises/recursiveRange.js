/**
 * Write a function called recursiveRange which accepts a number and adds up all the numbers from 0 to the number passed to the function
 * For examples:
 * recursiveRange(6) // 21
 * recursiveRange(10) // 55
 */

/**
 * The `recursiveRange` function recursively adds all numbers from 0 to the given argument `num`.
 * @param num - The `num` parameter is a number that represents the upper limit of the range of numbers
 * to be summed recursively.
 * @returns The function `recursiveRange` is returning the sum of all numbers from 0 to the original
 * `num` argument.
 */
const recursiveRange = (num) => {
  if (num === 0) return 0;
  /* `num + recursiveRange(num - 1);` is recursively calling the `recursiveRange` function with
  the argument `num - 1` and adding the current `num` to the result of the recursive call. This
  continues until the base case of `num === 0` is reached, at which point the function returns 0 and
  the recursion stops. The result is the sum of all numbers from 0 to the original `num` argument. */
  return num + recursiveRange(num - 1);
};

console.log(recursiveRange(6));
console.log(recursiveRange(10));

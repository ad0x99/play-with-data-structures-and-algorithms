/**
 * The function recursively calculates the sum of all numbers from 1 to the given input number.
 * @param num - The parameter `num` represents the number up to which we want to calculate the sum of
 * all the numbers from 1 to `num`.
 * @returns The function `sumRange` is a recursive function that takes a number `num` as input and
 * returns the sum of all numbers from 1 to `num`. If `num` is equal to 1, the function returns 1.
 * Otherwise, it adds `num` to the result of calling `sumRange` with `num - 1` as the argument.
 */
const sumRange = (num) => {
  if (num === 1) return 1; // The base case

  return num + sumRange(num - 1);
};

console.log(sumRange(5));

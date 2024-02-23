/**
 * Write a recursive function called fib which accepts a number and returns the nth number in the Fibonacci sequence.
 * Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ... which starts with 1 and 1, and where every number thereafter is equal to the sum of the previous two numbers.
 * For examples:
 * fib(4) // 3
 * fib(10) // 55
 * fib(28) // 317811
 * fib(35) // 9227465
 */

/**
 * The `fib` function recursively generates the Fibonacci sequence by adding the results of calling
 * itself with `num - 1` and `num - 2` as arguments.
 * @param num - The parameter `num` represents the position of the desired number in the Fibonacci
 * sequence. For example, if `num` is 5, the function will return the 5th number in the Fibonacci
 * sequence, which is 5 (since the sequence starts with 1, 1, 2
 * @returns The `fib` function is returning the `num`th number in the Fibonacci sequence. If `num` is
 * less than or equal to 2, the function returns 1. Otherwise, it recursively calls itself with `num -
 * 1` and `num - 2` as arguments, and then adds their results together to generate the Fibonacci
 * sequence.
 */
const fib = (num) => {
  if (num <= 2) return 1;
  return fib(num - 1) + fib(num - 2);
};

console.log(fib(4));
console.log(fib(10));
console.log(fib(28));
console.log(fib(35));

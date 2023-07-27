import { performanceTimer } from '../helpers/performance-timer.js';

/**
 * The `fib` function calculates the Fibonacci sequence for a given number.
 * @param num - The parameter "num" represents the position of the Fibonacci number that we want to calculate.
 * @returns The function `fib` returns the Fibonacci number at the given position `num`.
 *
 * Time complexity: O(2^n)
 */
const fib = (num) => {
  if (num <= 2) return 1;
  return fib(num - 1) + fib(num - 2);
};

/**
 * The `fibWithMemo` function calculates the Fibonacci sequence for a given number. This function applied memoization technique to reducing execution time when executes cached function calls
 *
 * @param num - The parameter "num" represents the position of the Fibonacci number that we want to calculate.
 * @param memo - The parameter "memo" represents an array of memoized function calls
 * @returns The function `fib` returns the Fibonacci number at the given position `num`.
 *
 * Time complexity: O(n)
 */
const fibWithMemo = (num, memo = []) => {
  if (memo[num]) return memo[num];
  if (num <= 2) return 1;

  const result = fibWithMemo(num - 1, memo) + fibWithMemo(num - 2, memo);
  memo[num] = result;

  return result;
};

/**
 * The function `fibWithTabulated` calculates the Fibonacci number at a given position using tabulation.
 * @param num - The parameter `num` represents the position of the Fibonacci number that you want to calculate.
 * @returns The function `fibWithTabulated` returns the Fibonacci number at the given index `num`.
 *
 * Time complexity: O(n)
 * Space complexity: 0(1)
 */
const fibWithTabulated = (num) => {
  if (num <= 2) return 1;
  let fibNums = [0, 1, 1];

  for (let i = 3; i <= num; i++) {
    fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
  }

  return fibNums[num];
};

console.log(fib(5));
console.log(fibWithMemo(5));
// console.log(fibWithMemo(10000)); // => led to stack overflow error
console.log(fibWithTabulated(5));
console.log(fibWithTabulated(10000)); // => Prevent stack overflow error

performanceTimer(fib(5));
performanceTimer(fibWithMemo(5));
performanceTimer(fibWithTabulated(5));

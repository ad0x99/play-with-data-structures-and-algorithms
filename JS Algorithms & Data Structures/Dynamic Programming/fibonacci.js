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

console.log(fib(5));
console.log(fibWithMemo(5));

performanceTimer(fib(5));
performanceTimer(fibWithMemo(5));

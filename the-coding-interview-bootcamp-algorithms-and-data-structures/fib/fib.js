// --- Directions
// Print out the n-th entry in the fibonacci series.
// The fibonacci series is an ordering of numbers where
// each number is the sum of the preceding two.
// For example, the sequence
//  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
// forms the first ten entries of the fibonacci series.
// Example:
//   fib(4) === 3

// Solution 1
/**
 * "We start with an array of the first two Fibonacci numbers, and then iterate through the array,
 * adding the previous two numbers to get the next number in the sequence."
 *
 * The above function is a good example of a recursive function. It's a function that calls itself
 * @param n - the number of the Fibonacci number we want to find.
 * @returns The nth number in the Fibonacci sequence.
 */
const slowFib1 = (n) => {
  const result = [0, 1];

  for (let i = 2; i <= n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }

  return result[n];
};

// Solution 2
/**
 * "If n is less than 2, return n. Otherwise, return the sum of the previous two numbers in the
 * sequence."
 *
 * The function is recursive because it calls itself
 * @param n - The number of the Fibonacci number we want to find.
 * @returns The nth number in the Fibonacci sequence.
 */
const slowFib2 = (n) => {
  if (n < 2) {
    return n;
  }

  return fib2(n - 1) + fib2(n - 2);
};

// Solution 3 - Using Memoization
/**
 * "If the function has been called with the same arguments before, return the cached result, otherwise
 * call the function and cache the result."
 *
 * The function takes a function as an argument and returns a new function. The new function will check
 * if it has been called with the same arguments before. If it has, it will return the cached result.
 * If it hasn't, it will call the original function, cache the result, and return it
 * @param fn - The function to be memoized.
 * @returns A function that takes in a function and returns a function that takes in arguments.
 */
const memoize = (fn) => {
  const cache = {};

  return (...args) => {
    if (cache[args]) {
      return cache[args];
    }

    const result = fn.apply(this, args);
    cache[args] = result;

    return result;
  };
};

const fib = memoize(slowFib1);
const fib2 = memoize(slowFib2);

export default fib;

/**
 * https://leetcode.com/problems/fibonacci-number/description/
 *
 * Recursion Approach
 *
 * 1. The base case: If n is less than or equal to 1, return itself. Since F(0) = 0, F(1) = 1.
 * 2. Recurrence Relation: we recursively call the fib function with the given formula F(n) = F(n - 1) + F(n - 2).
 * 3. Optimization: Because the current result is the calculate of the previous calculation, instead of re-calculate it again, we will create a cache to hold the previous result.
 * - 3.1: We create a cache map to hold the previous result.
 * - 3.2: If the result for n is already in the cache, we return it.
 * - 3.3: After each calculation, we store the result in the cache for later use.
 *
 * Time complexity: O(n) * O(1) = O(n)
 *
 * Space complexity: O(n) for recursion stack + O(n) for the cache = O(n)
 */
const fib = (n) => {
  // Use a closure to create a private cache for memoization
  const cache = {};

  function memoizedFib(n) {
    if (n <= 1) {
      return n;
    }

    // Check if the result for n is already cached
    if (cache[n] !== undefined) {
      return cache[n];
    }

    // Calculate and store the result for future use
    cache[n] = memoizedFib(n - 1) + memoizedFib(n - 2);
    return cache[n];
  }

  return memoizedFib(n);
};

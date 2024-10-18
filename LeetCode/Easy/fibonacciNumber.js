/**
 * https://leetcode.com/problems/fibonacci-number/description/
 *
 * Top-down DP + Recursion Approach
 *
 * 1. The base case: If n is less than or equal to 1, return itself. Since F(0) = 0, F(1) = 1.
 *
 * 2. Recurrence Relation: we recursively call the fib function with the given formula F(n) = F(n - 1) + F(n - 2).
 *
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

/**
 *
 * Bottom-up DP Approach
 *
 * 1. The base case: If n is less than or equal to 1, return itself. Since F(0) = 0, F(1) = 1.
 *
 * 2. The base case, we add the base case to the `dp` array.
 *
 * 3. Iteration: We iterate through each element from `2` to `n + 1`, and calculate the current fib result of element at the i-th index by using F(i) = F(i - 1) + F(i - 2)
 *
 * 4. After iterating and calculate fib result of each element, we return the fib result of the element at the n index.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(n)
 */
const fib = (n) => {
  if (n <= 1) return n;

  let dp = new Array(n + 1).fill(0);

  // Base case
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

/**
 * Optimized Space Complexity
 *
 * 1. The base case: If n is less than or equal to 1, return itself. Since F(0) = 0, F(1) = 1.
 *
 * 2. We create a dp variable to temporarily store the current Fibonacci number being calculated.
 *
 * 3. Optimization:
 * - 3.1: We initialize dpPrev1 variable to store the previous Fibonacci number (F(n-1))
 * - 3.2: And we initialize ppPrev2 variable to store the second-previous Fibonacci number (F(n-2)).
 *
 * 4. Iteration: We iterate through each element from `2` to `n + 1`, and calculate the current fib result of element at the i-th index by using F(i) = F(i - 1) + F(i - 2)
 *
 * 5. Inside the loop, we calculate the current Fibonacci number (F(n)) by adding the previous two Fibonacci numbers (F(n-1) and F(n-2)).
 * - 5.1: Instead of storing all previous Fibonacci numbers, we use two variables (`dpPrev1` and `dpPrev2`) to efficiently keep track of the only two Fibonacci numbers needed for the current calculation.
 * - 5.2: After calculating dp (the current Fibonacci number), we swap the value of `dpPrev1`, `dpPrev2` and `dp` variables to update the values for the next iteration.
 * - 5.3: The dp becomes the new `dpPrev1` (previous Fibonacci number for the next calculation), the old `dpPrev1` value becomes the new `dpPrev2` (second-previous Fibonacci number for the next calculation).
 *
 * 6. After iterating through all Fibonacci numbers up to n, the final value stored in `dp` will be the nth Fibonacci number. We return the `dp` value.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(1)
 */
const fib = (n) => {
  if (n <= 1) return n;

  let dp = 0;

  // Optimization
  let dpPrev1 = 1;
  let dpPrev2 = 0;

  for (let i = 2; i < n + 1; i++) {
    dp = dpPrev1 + dpPrev2;
    [dpPrev1, dpPrev2] = [dp, dpPrev1];
  }

  return dp;
};

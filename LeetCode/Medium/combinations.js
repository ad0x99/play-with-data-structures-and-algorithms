/**
 * https://leetcode.com/problems/combinations/description/
 *
 * Backtracking & Recursion Approach
 *
 * 1. We create a `combinations` array to store the results of combinations, and a `currentCombination` array to store the current combination at each iteration.
 *
 * 2. The base case: If the length of the current combination is equal to k, that means we formed a valid combination, we push the current combination into the `combinations` array.
 *
 * 3. Recursion to find all the combinations: We iterate through a loop from `1` (inclusive) to `n` (inclusive). For each number i in the loop:
 * - 3.1: We add the current number (`i`) to the current combination.
 * - 3.2: We call `buildCombination` function recursively with a new start value (i + 1) to explore combinations starting from i + 1 (avoid duplicates). This ensures no element is included more than once in a combination.
 * - 3.3: After the recursive call, we remove the current element (i) from the `currentCombinations` array to backtrack and explore other possibilities.
 *
 * 4. After exploring all possible paths, we return the `combinations` array containing all the found combinations.
 *
 * Time complexity: O(2^n) because for each number from 1 to n, we have two choices - either include it in the combination or not include it.
 *
 * Space complexity: O(n)
 * - Storing all possible combinations in currentSolution (O(n))
 * - Recursion can potentially create a call stack of depth n. (O(n))
 */
const combine = (n, k) => {
  const combinations = [];
  const currentCombination = [];

  const buildCombination = (start) => {
    if (currentCombination.length === k) {
      combinations.push([...currentCombination]); // Add a copy to avoid mutation
      return;
    }

    for (let i = start; i <= n; i++) {
      currentCombination.push(i);
      buildCombination(i + 1); // Ensure no duplicates in a combination
      currentCombination.pop();
    }
  };

  buildCombination(1);
  return combinations;
};

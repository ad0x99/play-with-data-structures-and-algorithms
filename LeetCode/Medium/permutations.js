/**
 * https://leetcode.com/problems/permutations/description/
 *
 * Recursion & Backtracking Approach
 *
 * 1. We initialize the `currentPermutation` array to store the elements being built for the current permutation during the recursive exploration, and the `ans` array to store all the valid permutations found.
 *
 * 2. The base case: We check if the length of `currentPermutation` is equal to the length of the `nums` array, this indicates a complete permutation has been built with all elements from `nums` included once.
 * - 2.1: We then push a copy of the current permutation into the `ans` array to store the valid permutation.
 * - 2.2: We then return to stop further recursion for this branch.
 *
 * 3. Recursive Exploration
 * - 3.1: If the current permutation is not yet complete, we iterate through each element (num) in the `nums` array.
 * - 3.2: Inside the loop, we check if the current number is already present in the `currentPermutation`, we skip the current number to avoid duplication.
 * - 3.3: Otherwise, we add the current number to the `currentPermutation` array.
 * - 3.4: We call `buildPermutation` function recursively with an incremented `i` by `1` to explore further possibilities by adding the remaining elements to the permutation. This explores all possible orderings.
 *
 * 4. Backtracking: After the recursive call returns, the recently added element num is removed from `currentPermutation` and explore permutations with different orderings for the remaining elements.
 *
 * Time complexity: O(n!) The total number of permutations of an array of length n is n! (n factorial).
 *
 * Space complexity: O(n), where n is the number of elements in the array `nums`.
 *
 */
const permute = (nums) => {
  let currentPermutation = [];
  let ans = [];

  const buildPermutation = (i) => {
    if (currentPermutation.length === nums.length) {
      ans.push([...currentPermutation]);
      return;
    }

    for (const num of nums) {
      if (currentPermutation.includes(num)) continue;

      currentPermutation.push(num);
      buildPermutation(i + 1);
      currentPermutation.pop();
    }
  };

  buildPermutation(0);
  return ans;
};

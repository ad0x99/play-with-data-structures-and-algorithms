/**
 * https://leetcode.com/problems/combinations/description/
 *
 * Backtracking & Recursion Approach
 *
 * 1. We create a `combinations` vector to store the results of combinations, and a `currentCombination` vector to store the current combination at each iteration.
 *
 * 2. The base case: If the length of the current combination is equal to k, that means we formed a valid combination, we push the current combination into the `combinations` vector.
 *
 * 3. Recursion to find all the combinations: We iterate through a loop from `1` (inclusive) to `n` (inclusive). For each number i in the loop:
 * - 3.1: We add the current number (`i`) to the current combination.
 * - 3.2: We call `buildCombination` function recursively with a new start value (i + 1) to explore combinations starting from i + 1 (avoid duplicates). This ensures no element is included more than once in a combination.
 * - 3.3: After the recursive call, we remove the current element (i) from the `currentCombinations` vector to backtrack and explore other possibilities.
 *
 * 4. After exploring all possible paths, we return the `combinations` vector containing all the found combinations.
 *
 * Time complexity: O(2^n) because for each number from 1 to n, we have two choices - either include it in the combination or not include it.
 *
 * Space complexity: O(n)
 * - Storing all possible combinations in currentSolution (O(n))
 * - Recursion can potentially create a call stack of depth n. (O(n))
 */
impl Solution {
    pub fn combine(n: i32, k: i32) -> Vec<Vec<i32>> {
        let mut combinations = Vec::new();
        let mut current_combination = Vec::new();

        fn build_combination(
            start: i32,
            n: i32,
            k: i32,
            current_combination: &mut Vec<i32>,
            combinations: &mut Vec<Vec<i32>>,
        ) {
            if current_combination.len() == k as usize {
                combinations.push(current_combination.clone());
                return;
            }

            for i in start..=n {
                current_combination.push(i);
                build_combination(i + 1, n, k, current_combination, combinations);
                current_combination.pop();
            }
        }

        build_combination(1, n, k, &mut current_combination, &mut combinations);
        combinations
    }
}

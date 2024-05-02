/**
 * https://leetcode.com/problems/subsets/description/
 *
 * Recursion & Backtracking Approach:
 *
 * Mathematically, A list has n elements will have 2^n subsets.
 *
 * We want to iterate through each element and find the subsets within 2 scenarios.
 * - The first case, we include the current element to find the possibility of subsets.
 * - The second case, we find the possibility of subsets without the current element.
 *
 * 1. We initialize the result array to store a list of subsets as the result and the subset array to store the subset.
 * 2. We recursively build the subsets using the buildSubset function.
 * 3. The buildSubset function takes 4 arguments:
 * - 3.1: index: the current index we're considering in the nums array.
 * - 3.2: nums: the original nums array.
 * - 3.3: subset: a temporary array to store the current subset being built.
 * - 3.4: result: the final array that will store all the generated subsets.
 *
 * 4. In the buildSubset function, we handle the base case first.
 * - 4.1: If we're reached the end of the nums array, that means we're build a complete subset. We push the current subset into the result array.
 * 5. The first case, we include the current element
 * - 5.1: We add the current element at the current index from nums to the subset array.
 * - 5.2: We recursively call buildSubset with the index + 1 to consider the next element in the nums array.
 * - 5.3: After this recursive call finishes exploring possibilities with the current element included, we continue to the next step.
 *
 * 6. The second case, we exclude the current element (backtracking).
 * - 6.1: We remove the current element that was just added to the subset in the previous step. Because we want to explore the possibility of subset without the current element.
 *
 * 7. Finally, we recursively call the buildSubset to explore the possibilities with the current element excluded.
 *
 * Time complexity: O(n * 2^n)
 *
 * Space complexity: O(n)
 */
// const subsets = (nums) => {
//   let result = [];
//   let subset = [];

//   buildSubset(0, nums, subset, result);
//   return result;
// };

const buildSubset = (index, nums, subset, result) => {
  if (index === nums.length) {
    result.push([...subset]);
    return;
  }

  // Pick the current number and push into subset
  subset.push(nums[index]);
  buildSubset(index + 1, nums, subset, result);
  subset.pop();

  // Don't pick the current number
  buildSubset(index + 1, nums, subset, result);
};

/**
 * Bit Manipulation Approach:
 *
 * Mathematically, A list has n elements will have 2^n subsets.
 *
 * 1. We initialize a result array to store the final subsets.
 * 2. We iterate through all possible combinations of including/excluding elements from 0 to 2 ^ n (1 << n) using the bitwise left shift operator (<<). This value represents the total number of possible subsets (considering each element can be included or excluded).
 * 3. Inside the loop, we initialize a subset array to store the elements for the current subset.
 *
 * 4. The nested loop iterates through each element (j) in the original array (nums).
 * - 4.1: We use bit manipulation to extract information about the current element (j) from the ith iteration value. (`(i >> j) & 1`)
 * - 4.2: The `i >> j` operation performs a right shift operation on i by j positions. This essentially moves a hypothetical "1" bit j positions to the right within the binary representation of i.
 * - 4.3: The `& 1` operation performs a bitwise `AND` with `1`. This isolates the rightmost bit after the shift, which will be 1 if the corresponding element (j) should be included in the subset based on the ith iteration value.
 * - 4.4: We check if the extracted bit (currentBit) is 1, it means the element at index j should be included in the current subset. We add the element at index j from the original nums array to the subset array.
 *
 * 5. After the inner loop finishes iterating through all elements, the subset array holds the elements for the current combination. We add the completed subset array to the result array, storing the current subset.
 * 6. After the outer loop finishes iterating through all possible combinations (2 ^ n times), the result array will contain all subsets of the original nums array. We return the result array containing all the generated subsets.
 *
 * Time complexity: O(2^n * n) - because there are 2^n possible subsets and for each subset, we iterate through the entire input array of length n to determine which elements to include in the subset.
 *
 * Space complexity: O(2^n * n) - because we are storing all possible subsets in the result array, each subset potentially containing up to n elements.
 *
 */
const subsets = (nums) => {
  let n = nums.length;
  let result = [];
  let twoToTheN = 1 << n; // 2 ^ n

  for (let i = 0; i < twoToTheN; i++) {
    let subset = [];

    for (let j = 0; j < n; j++) {
      // Get bit of the element at j index
      const currentBit = (i >> j) & 1;

      if (currentBit === 1) {
        subset.push(nums[j]);
      }
    }

    result.push(subset);
  }

  return result;
};

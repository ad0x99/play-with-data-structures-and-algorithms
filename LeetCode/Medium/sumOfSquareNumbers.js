/**
 * https://leetcode.com/problems/sum-of-square-numbers/description/
 *
 * Brute Force Approach: In the brute force approach to finding a and b such that a^2 + b^2 = c, starting from the negative square root of c (rounded down) and going up to the positive square root of c helps us avoid redundant checks and ensures we consider all possible integer combinations of a and b.
 * Since we're dealing with squares of integers (a^2 and b^2), both a and b must be integers. Squares of integers are always non-negative (0 or positive).
 *
 * The equation a^2 + b^2 = c is symmetrical with respect to a and b. This means that swapping a and b doesn't change the outcome. For example, if 2^2 + 3^2 = 13, then 3^2 + 2^2 (which is the same equation) is also true and will also result in 13.
 * To ensure we explore all possible integer combinations, we need to consider both positive and negative values for a and b. However, due to the symmetry, checking only the positive square root of c for both a and b would lead to redundant calculations.
 *
 * Since squares are non-negative, negative values of a and b will have positive squares.
 * Starting from the negative square root of c (rounded down) ensures we include the largest possible negative value for a whose square might contribute to c. For example, if c is 13, the negative square root is roughly -3.6. We round down to -4, which means a can be as low as -4.
 * By going up to the positive square root of c, we cover all the remaining positive squares that a and b can take.
 *
 * Time complexity: O(n^2) - because this function uses 2 nested for loops, each iterating up to a maximum of Math.floor(Math.sqrt(c)) times in both the positive and negative directions. This means the total number of iterations is roughly proportional to sqrt(c) * sqrt(c), which is equivalent to c.
 *
 * Space complexity: O(1)
 *
 */
const judgeSquareSumBruteForce = (c) => {
  // Iterate through all possible combinations of a and b
  for (let a = -Math.floor(Math.sqrt(c)); a <= Math.sqrt(c); a++) {
    for (let b = -Math.floor(Math.sqrt(c)); b <= Math.sqrt(c); b++) {
      if (a * a + b * b === c) {
        return true; // Combination found
      }
    }
  }

  // No combination found
  return false;
};

/**
 * Two Pointers Approach: Using a leftmost pointer and rightmost pointer to calculate the target combination, and move the corresponding pointer to find the expected combination.
 *
 * 1. We declare a left pointer starts from 0, and a right pointer starts from Math.floor(Math.sqrt(c)), which means the largest possible integer whose square can contribute to c. This gives us an idea of the maximum possible integer whose square can contribute to the sum a^2 + b^2 and still be less than or equal to c.
 * 2. As long as left is less than or equal to right, we continue the iteration.
 * 3. As we're trying to find two integers a and b such that a^2 + b^2 = c, we initialize a target combination as left ^ 2 + right ^ 2 = targetSum.
 * 4. If the c is greater than target sum, this means the current sum of squares is smaller than c, so we need to increase left to try a larger square.
 * 5. If the c is less than the target sum, this means the current sum of squares is greater than c, so we need to decrease right to try a smaller square.
 * 6. Otherwise, we found a combination and return true.
 * 7. If there is no combination found, return false
 *
 * Time complexity: O(sqrt(c)) - because we are iterating from 0 to the square root of c.
 *
 * Space complexity: O(1)
 */
const judgeSquareSumTwoPointer = (c) => {
  let left = 0;
  let right = Math.floor(Math.sqrt(c));

  while (left <= right) {
    let targetSum = left ** 2 + right ** 2;

    if (c > targetSum) {
      left += 1;
    } else if (c < targetSum) {
      right -= 1;
    } else {
      return true;
    }
  }

  return false;
};

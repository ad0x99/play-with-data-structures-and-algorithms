/**
 * https://leetcode.com/problems/valid-perfect-square/description/
 *
 * Brute Force Approach: A perfect square of the num is one of the number between 0 and num. We iterate through the range of 0 to num, and find the perfect square. If we found a perfect square, we return true immediately, otherwise we return false.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(1)
 */
const isPerfectSquareBruteForce = (num) => {
  let left = 0;

  while (left <= num) {
    if (left * left === num) {
      return true;
    } else {
      left += 1;
    }
  }

  return false;
};

/**
 *
 * Binary Search Approach: A perfect square of the num is one of the number between 0 and num. We will split the range from 0 to num into 2 slices, and find the perfect square in each slice.
 *
 * 1. If we found a perfect square, we return true immediately.
 * 2. If the current square is less than num, we increase the left to find potential perfect square in the right slice.
 * 3. Otherwise, if the current square is greater than num, we decrease the right to find potential perfect square in the left slice.
 * 4. If there is no perfect square found, we return false.
 *
 * Time complexity: O(log n)
 *
 * Space complexity: O(1)
 */
const isPerfectSquareBinarySearch = (num) => {
  let left = 0;
  let right = num;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (mid * mid === num) {
      return true;
    } else if (mid * mid < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
};

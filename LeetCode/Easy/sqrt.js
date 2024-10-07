/**
 * https://leetcode.com/problems/sqrtx/
 *
 * 1. If x is 0 or 1, the square root is x itself, so we return x directly.
 * 2. Otherwise, we iterate through the range from 2 to x and check.
 * 3. If i * i is equal to x, it means i is the exact square root, so we return i.
 * 4. If i * i is greater than x, it means i is too large, and the closest integer square root is i - 1, so we return i - 1.
 *
 * Time complexity: O(sqrt(x)) because the function iterates from 2 to the square root of the input number x.
 *
 * Space complexity: O(1)
 */
const mySqrtIterative = function (x) {
  if (x <= 1) {
    return x;
  }

  for (let i = 2; i <= x; i++) {
    if (i * i === x) {
      return i;
    }

    if (i * i > x) {
      return i - 1;
    }
  }
};

/**
 * Binary Search Approach: We will iterate from the 0 to the x to find the potential square root. We divide the range from 0 to x into 2 slices, and look for the potential square in each slice.
 *
 * 1. We initialize the lower bound of the potential square root values at 0, and the upper bound of the potential square root values at x. We will iterate the range from 0 to x.
 * 2. We declare a ans variable to keep track the best potential square root each time we iterate through the range.
 * 3. As long as there is number in the range (left <= right).
 * 4. We split the range into 2 slices.
 * 5. We select the middle number as a potential square root. When we found a number that match the condition of mid * mid <= x (a potential square root), we update the best possible square root to ans variable, and increase the left pointer to the middle to get higher square root.
 * 6. Otherwise, we decrease the right pointer to the middle to get lower square root.
 * 7. We keep iterate through all the number the specified range and return the result of ans variable.
 *
 * Time complexity: O(log n) - where n is the input value x. Because the search space is halved in each iteration
 *
 * Space complexity: O(1)
 */
const mySqrtBinarySearch = function (x) {
  let left = 0;
  let right = x;
  let ans = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (mid * mid <= x) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
};

/**
 * Same as above, but we will iterate through the range from 0 to sqrt(2^32-1) where the 2^32-1 is the constraint of the problem. This can reduce integer overflow.
 *
 * Time complexity: O(log(sqrt(x)))
 *
 * Space complexity: O(1)
 */
const mySqrtBinarySearch = function (x) {
  let left = 0;
  let right = 65535; // sqrt(2^31-1) = 65535
  let ans = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (mid * mid <= x) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
};

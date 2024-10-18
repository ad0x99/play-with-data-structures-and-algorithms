/**
 * https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * Binary Search Approach: Using the technique of lower bound and upper bound functions to find the first and last position of an element in an array.
 *
 * The lower bound function will return the first element that is greater than or equal to the search value.
 *
 * The upper bound function will return the first element that is strictly greater than the search value.
 *
 * Time complexity: O(log n) + O(log n) = O(log n)
 *
 * Space complexity: O(1)
 */
const searchRange = (nums, target) => {
  /**
   * Finds the first element that is greater than or equal to the search value.
   */
  const lowerBound = (nums) => {
    let left = 0;
    let right = nums.length - 1;
    let ans = -1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      let currentMid = nums[mid];

      // If the current mid is equal to the target
      if (currentMid === target) {
        // We update the best result so far
        ans = mid;
        // We decrease the right side to search for better result on the left side
        right = mid - 1;
      } else if (currentMid < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return ans;
  };

  /**
   * Finds the first element that is strictly greater than the search value.
   */
  const upperBound = (nums) => {
    let left = 0;
    let right = nums.length - 1;
    let ans = -1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      let currentMid = nums[mid];

      // If the current mid is equal to the target
      if (currentMid === target) {
        // We update the best result so far
        ans = mid;
        // We increase the left side to search for better result on the right side
        left = mid + 1;
      } else if (currentMid < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return ans;
  };

  return [lowerBound(nums), upperBound(nums)];
};

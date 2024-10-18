/**
 * https://leetcode.com/problems/search-in-rotated-sorted-array/description/
 *
 * Brute Force Approach: Loop through each element of the array and find the target one.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(1)
 */
const searchBruteForce = (nums, target) => {
  for (let num = 0; num < nums.length; num++) {
    if (nums[num] === target) {
      return num;
    }
  }

  return -1;
};

/**
 *
 * The input array is rotated and sorted. We can assume that the input array contains 2 non-decreasing parts, which are the left and right of the input array.
 *
 * For example: nums = [4,5,6,7,0,1,2], target = 0
 *
 * In this example, the left (first) part is [4, 5, 6, 7], and the right (second) part is [0, 1, 2]. We want to find the target number in one of these parts.
 *
 * To do that, we need to find out which part the target number is in.
 *
 * Case 1: [4,5,6,7,0,1,2], we assume the mid = 7
 * In this case, we can see that the leftmost value is less than the current mid value (4 < 7), hence, we know that the mid is in the left part
 *
 * The left part: [4,5,6,7,_,_,_]
 *
 * If we in the left part, we need to find out, if the current mid is less than the target or the leftmost value is greater than target, then we need to find in the right part. Otherwise, we find in the left part
 *
 * Case 2: [4,5,6,7,0,1,2], we assume the mid = 1
 * In this case, we can see that the leftmost value is greater than the current mid value (4 > 1), hence, we know that the mid is in the right part
 *
 * The right part: [_,_,_,_,0,1,2]
 *
 * If we in the right part, we need to find out, if the current mid is greater than the target or the rightmost value is less than target, then we need to find in the right part. Otherwise, we find in the left part
 *
 *
 * Time complexity: O(log n)
 *
 * Space complexity: O(1)
 */
const search = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Find the target in the left sorted part
    if (nums[mid] >= nums[left]) {
      if (nums[mid] < target || nums[left] > target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      // Find the target in the right sorted part
      if (nums[mid] > target || nums[right] < target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return -1;
};

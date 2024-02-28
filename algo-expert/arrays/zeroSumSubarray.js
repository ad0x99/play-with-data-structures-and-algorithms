/**
 * QUESTION
 *
 * You're given a list of integers `nums`. Write a function that returns a boolean representing whether there exists a zero-sum subarray of `nums`.
 *
 * A zero-sum subarray is any subarray where all of the values add up to zero. A subarray is any contiguous section of array. For the purposes of this problem, a subarray can be as small as one element and as long as the original array.
 *
 * Sample Input:
 * nums = [-5, -5, 2, 3, -2]
 *
 * Sample Output:
 * True // the subarray [-5, 2, 3] has a sum of 0
 */

/**
 * SOLUTION
 *
 * The idea is if the sum of 0 to x and sum of 0 to y is the same
 * then the sum at position x + 1 to y will be equal to 0, it means we found 2 subarrays have the same sum => we found the zero sum subarray
 * [0, x] = S and [0, y] = S => [x + 1, y] = 0
 *
 * The time complexity of this function is O(n) because it iterates through the input array of length n exactly once.
 *
 * The space complexity is also O(n) because the size of the set 'sums' can grow up to the size of the input array in the worst case scenario where there are no zero-sum subarrays.
 *
 */
export const zeroSumSubarray = (nums) => {
  // We create a Set to keep track the sum result of each subarray
  // we filled zero value as initial value because there is a chance that we found a zero sum array starting from zero index to the next
  // we use Set because we want a data structure that has fast insertion and look up to check in the loop
  let sums = new Set([0]);
  let currentSum = 0;

  for (const num of nums) {
    // Each time we traverse through the array, we calculate the current sum
    // because the previous sum is the sum of all the previous numbers until current sum
    // therefore, the current sum is equal to previous sum + current number
    currentSum += num;

    // If the current sum is already existed, that means we found a zero sum array
    if (sums.has(currentSum)) return true;

    // Otherwise, we add the current sum to the sums set and keep traversing
    sums.add(currentSum);
  }

  return false;
};

const nums1 = [-5, -5, 2, 3, -2];
const nums2 = [4, -3, 2, 4, -1, -5, 7];
const nums3 = [];
const nums4 = [0];
const nums5 = [1];
const nums6 = [1, 2, 3];
const nums7 = [1, 1, 1];
const nums8 = [-1, -1, -1];
const nums9 = [
  -8, -22, 104, 73, -120, 53, 22, 20, 25, -12, 1, 14, -90, 13, -22,
];
const nums10 = [-8, -22, 104, 73, -120, 53, 22, -12, 1, 14, -90, 13, -22];
console.log(zeroSumSubarray(nums1)); // True
console.log(zeroSumSubarray(nums2)); // True
console.log(zeroSumSubarray(nums3)); // False
console.log(zeroSumSubarray(nums4)); // True
console.log(zeroSumSubarray(nums5)); // False
console.log(zeroSumSubarray(nums6)); // False
console.log(zeroSumSubarray(nums7)); // False
console.log(zeroSumSubarray(nums8)); // False
console.log(zeroSumSubarray(nums9)); // True
console.log(zeroSumSubarray(nums10)); // False

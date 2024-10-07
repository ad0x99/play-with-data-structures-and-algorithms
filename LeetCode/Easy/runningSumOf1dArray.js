/**
 * https://leetcode.com/problems/running-sum-of-1d-array/description/
 *
 * SOLUTION 1
 * The `runningSum` function takes an array of numbers and returns a new array where each element is the running sum of the original array up to that index.
 * @param nums - The `nums` parameter is an array of numbers.
 * @returns The function `runningSum` returns an array containing the running sum of the input array `nums`.
 *
 * Time complexity : O(N)
 * Space complexity : O(1)
 */
const runningSum = (nums) => {
  const result = [];

  for (let i = 0; i <= nums.length; i++) {
    if (nums[0] === nums[i] && !result.includes(nums[i])) {
      result.push(nums[i]);
    } else if (Number.isInteger(nums[i])) {
      result.push((nums[i] += nums[i - 1]));
    }
  }

  return result;
};

/**
 * SOLUTION 2
 * The function `runningSum1` takes an array of numbers and returns a new array where each element is the running sum of all previous elements in the input array.
 * @param nums - The `nums` parameter is an array of numbers.
 * @returns The function `runningSum1` returns an array containing the running sum of the input array `nums`.
 */
const runningSum1 = (nums) => {
  const result = [];

  for (let i = 0; i <= nums.length; i++) {
    const currentNumber = nums[i];
    const numBeforeCurrent = nums.slice(0, i);

    if (numBeforeCurrent.length && Number.isInteger(currentNumber)) {
      result.push(numBeforeCurrent.reduce((a, b) => a + b, 0) + currentNumber);
    } else if (Number.isInteger(currentNumber)) {
      result.push(currentNumber);
    }
  }

  return result;
};

const nums = [1, 2, 3, 4];
const nums1 = [1, 1, 1, 1];

console.log(runningSum(nums));
console.log(runningSum1(nums));

console.log(runningSum(nums1));
console.log(runningSum1(nums1));

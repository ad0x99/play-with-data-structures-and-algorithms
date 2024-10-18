/**
 * https://leetcode.com/problems/range-sum-query-immutable/description/
 *
 * The idea is the sum of the current element is the sum of all previous elements plus itself. Therefore, the sum of a specific range is equal to the sum of all previous elements plus itself minus the un-calculated range.
 *
 * For example: nums = [1, 2, 3, 4, 5, 6], range = [2, 3]
 *         prefixSum = [1, 3, 6, 10, 15, 21]
 * In this example, sum of range [2, 3] = sum of range [0, 3] - sum of range [0, 1]
 * Sum of range [0, 3] = 1 + 2 + 3 + 4 = 10
 * Sum of range [0, 1] = 1 + 2 = 3
 * Sum of range [2, 3] = [0, 3] - [0, 1] = 10 - 3 = 7
 *
 * 1. We create a prefixSum array to store all the sum of elements
 * 2. We iterate through the array to calculate the sum of elements and add it to the prefixSum array
 * 3. In the sumRange function, we calculate the sum of specified range with the formula of rightSum - previousSumOfLeft
 * 4. With the left sum, we have to add a condition in case the range is start from 0, that means there is no previous left sum, then we use default value of 0 to make the calculation.
 *
 * The time complexity of the NumArray constructor is O(n) where n is the number of elements in the input array nums. This is because we iterate through each element in the nums array to calculate the prefix sum.
 *
 * The time complexity of the sumRange method is O(1) because we are calculating the sum of a range in constant time using the precomputed prefix sum values.
 *
 */
const NumArray = function (nums) {
  this.prefixSum = [];
  let currentSum = 0;

  for (let num of nums) {
    currentSum += num;
    this.prefixSum.push(currentSum);
  }
};

NumArray.prototype.sumRange = function (left, right) {
  let rightSum = this.prefixSum[right];
  let previousSumOfLeft = left > 0 ? this.prefixSum[left - 1] : 0;
  return rightSum - previousSumOfLeft;
};
// [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
//        NumArray         sumRange sumRange sumRange
const nums = [-2, 0, 3, -5, 2, -1];
const obj = new NumArray(nums);

const param1 = obj.sumRange(0, 2); // 1
const param2 = obj.sumRange(2, 5); // -1
const param3 = obj.sumRange(0, 5); // -3

console.log([null, param1, param2, param3]); // [null, 1, -1, -3]

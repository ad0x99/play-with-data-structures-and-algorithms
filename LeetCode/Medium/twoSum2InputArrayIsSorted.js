/**
 * https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
 *
 * This solution is suitable for sorted array. We use 2 pointers from start and end of the array to calculate the sum.
 *
 * 1. As the array is sorted, therefore, the right is always greater the left
 * 2. As long as the left is less than the right, we iterate through the array from left to right
 * 3. If current number of the left pluses the right is equal to the target, we return the result
 * 4. If the sum of current left and right is greater than the target, we decrease the right by 1 to get the lower number
 * 5. Otherwise, we increase the right by 1 to get the higher number
 *
 * The time complexity of this function is O(n) because in the worst case scenario, both pointers will traverse the entire array once.
 *
 * The space complexity is O(1) because the function uses a constant amount of extra space regardless of the input size.
 */
const twoSumWith2Pointers = (numbers, target) => {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    if (numbers[left] + numbers[right] === target) {
      return [left + 1, right + 1];
    } else if (numbers[left] + numbers[right] > target) {
      right -= 1;
    } else {
      left += 1;
    }
  }

  return [-1, -1];
};

console.log(twoSumWith2Pointers([2, 11, 7, 15], 9)); // [1, 3]
console.log(twoSumWith2Pointers([3, 2, 4], 6)); // [-1, -1]
console.log(twoSumWith2Pointers([3, 3], 6)); // [1, 2]

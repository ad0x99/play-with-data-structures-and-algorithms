/**
 * https://leetcode.com/problems/sort-colors/description/
 *
 * The idea is to leverage quick sort algorithms to sorting the colors. Because we only have 3 colors with corresponding sorted numbers are 0, 1, 2. We notice that the number 1 will always be in the middle of the array. Therefore, we're going to move all the numbers are less than 1 (0) to the left, and all the numbers are greater than 1 (2) to the right of the array. After swapping those numbers, we will have a sorted array.
 *
 * 1. We create a temp variable to keep track the current comparable number.
 * 2. Firstly, we iterate through the array from first to the last element (`0 to nums.length - 1`)
 * - 2.1: If the current element is equal to 0, we move it to the left of the array by swapping the current element with the temp position.
 * - 2.2: We increase the temp position by 1 to move to the next potential swapping position
 *
 * 3. Secondly, we iterate through the array from last to the first element (`nums.length - 1 to 0`)
 * - 3.1: If the current element is equal to 2, we move it to the right of the array by swapping the current element with the temp position.
 * - 3.2: We decrease the temp position by 1 to move to the next potential swapping position
 *
 * 4. After iterating through all the elements, we return sorted nums as the result.
 *
 * Time complexity: O(n) - where n is the length of the array
 *
 * Space complexity: O(1)
 */
const sortColors = (nums) => {
  // Move all smaller elements to the left
  let temp = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      swap(nums, temp, i);
      temp++;
    }
  }

  // Move all larger elements to the right
  temp = nums.length - 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === 2) {
      swap(nums, temp, i);
      temp--;
    }
  }

  return nums;
};

const swap = (nums, left, right) => {
  [[nums[left], nums[right]]] = [[nums[right], nums[left]]];
};

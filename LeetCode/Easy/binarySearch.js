/**
 * https://leetcode.com/problems/binary-search/description/
 *
 * Brute Force Approach: The idea is to loop through each element in the array until we found the element is equal to the target.
 *
 * Time complexity: O(n) - where n is the number of elements in the array, which means the length of the array.
 *
 * Space complexity: O(1)
 */
const search = (nums, target) => {
  if (!nums.length) return -1;

  for (let i = 0; i <= nums.length; i++) {
    if (nums[i] === target) return i;
  }

  return -1;
};

/**
 * Binary Search Approach: The idea is to split the array into 2 slices, and looking for the target value in one of the slices.
 *
 * 1. We initialize a left pointer starts from the beginning of the array, and a right pointer starts from the end of the array.
 * 2. As long as the left is less than or equal to the right, that means, we still have the element to look for.
 * 3. We divide the array into 2 slices by finding the middle position of the array.
 * 4. If the current element at the middle position is equal to the target, that means we found the target in the array, then we return its index.
 * 5. If the current element at the middle position is greater than the target, that means, the target is at somewhere in the left of the array (the first part of the array). From that, we can know the all the elements from the current mid to the current right are no longer valid. We will remove all of that elements out of the potential target by moving the right to the position of mid - 1. Because the current mid is invalid, so we don't to check it again, that's why we move the right to the previous element of the current mid.
 * 6. Otherwise, if the current element at the middle position is less than the target, that means, the target is at somewhere in the right of the array (the second part of the array), then we move the left pointer to the position of mid + 1.
 * 7. If there is no target value in the array, we return -1.
 *
 * Time complexity: O(log n) because with each iteration, the search space is divided in half.
 *
 * Space complexity: O(1)
 */
const search = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((right + left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};

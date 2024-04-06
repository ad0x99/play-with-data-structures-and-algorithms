/**
 * https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
 *
 * Binary Search Approach - Analyze the problem
 *
 * First example, we have a rotated array:
 * [5,6,7,0,1,2,3] if it was rotated 3 times.
 * We can notice that, the array is divided into 2 non-decreasing slices which are [5,6,7] and [0,1,2,3]. In this case, If we divide the array into 2 slices and get the middle element [0], that means we found the minimum element => the minimum element would be the element that less than its left and right elements (7 > 0 < 1)
 *
 * In other case, if we get the middle element in the first slice [5,6,7], we have to increase the left side to find the potential minimum element in the right slice.
 *
 * Or if we get the middle element in the second slice [0,1,2,3], we have to decrease the right side to find the potential minimum element in the left slice.
 *
 * Second example (edge case) -  [1,2,3,4]
 *
 * In this case, the minimum element would be the first element of the array. But as the first example, we don't have the left element in this case, but it's still the minimum element.
 *
 * Third example (edge case) - [2, 1]
 *
 * In this case, the minimum element would be the last element of the array. But as the first example, we don't have the right element in this case, but it's still the minimum element.
 *
 * Follow up with those 3 examples, we can summary 2 conditions to find the minimum element:
 * 1. If the current element is the first element of the array OR if the current's left element is greater than the current one
 * 2. If the current element is the last element of the array OR if the current's right element is greater than the current one
 *
 * Combine those 2 conditions, we will find the minimum element.
 *
 * Implementation
 *
 * 1. We initialize the left pointer which starts from 0 as the first element of the array, the right pointer which starts from the end of the array as the last element of the array.
 * 2. As long as there is at least one element in the array, we iterate through each element.
 * 3. We initialize the middle element as the potential minimum element.
 * 4. If the current mid is equal to the current left, or the current's left is greater than the current mid. And if the current mid is equal to the current right, or the current's right is greater than the current mid. That means we found the minimum element, then we return it.
 * 5. Otherwise, if the current mid is greater than the current end element of the array, that means, the mid is in the first slice of the array, then we need to move the left pointer to find the potential minimum in the right slice.
 * 6. Or if the current mid is less than the current end element of the array, that means, the mid is in the second slice of the array, then we need to move the right pointer to find the potential minimum in the left slice.
 *
 * Time complexity: O(log n) - where n is the length of the array
 *
 * Space complexity: O(1)
 */
const findMin = (nums) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (
      (mid === left || nums[mid - 1] > nums[mid]) &
      (mid === right || nums[mid + 1] > nums[mid])
    ) {
      return nums[mid];
    }

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return 0;
};

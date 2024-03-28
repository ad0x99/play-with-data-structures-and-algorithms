/**
 * https://leetcode.com/problems/kth-largest-element-in-an-array/description/
 * The function "findKthLargest" takes an array of numbers and an integer "k" as input, sorts the array
 * in ascending order, and returns the kth largest number.
 * @param nums - An array of numbers.
 * @param k - The parameter `k` represents the position of the largest element we want to find in the
 * array `nums`.
 * @returns The kth largest element in the given array.
 *
 * Time complexity : O(klogn)
 * Space complexity : O(1)
 */
const findKthLargestWithSorting = (nums, k) => {
  const sortedNums = nums.sort();
  return sortedNums[nums.length - k];
};

console.log(findKthLargestWithSorting([3, 2, 1, 5, 6, 4], 2));
console.log(findKthLargestWithSorting([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));

const findKthLargest = (nums, k) => {
  const left = 0;
  const right = nums.length - 1;
  k = nums.length - k;

  const quickSelect = (left, right) => {
    const pivot = nums[right];
    let pointer = left;

    for (let i = left; i < right; i++) {
      // If the current value is less than the pivot
      // We swap the previous pointer with the current index
      // Then we increase the pointer by 1
      if (nums[i] <= pivot) {
        swap(nums, pointer, i);
        pointer++;
      }
    }

    // Otherwise swap the current pointer with the pivot
    swap(nums, pointer, right);

    // If the pointer is greater than the k
    // We recursively find in the left side
    if (pointer > k) {
      return quickSelect(left, pointer - 1);
    } else if (pointer < k) {
      // If the pointer is less than the k
      // We recursively find in the right side
      return quickSelect(pointer + 1, right);
    } else {
      // Otherwise, I'd be the pointer
      return nums[pointer];
    }
  };

  // We pick the left pointer as first element and the pivot in the right as the last element
  return quickSelect(left, right);
};

const swap = (array, idx1, idx2) => {
  [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
};

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));

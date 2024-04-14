/**
 * https://leetcode.com/problems/sort-an-array/description/
 *
 * Merge Sort Approach: We split the original array into 2 parts, and then we sort the first part and second part individually. After sorting the first and second parts, we have 2 sorted parts. We will merge those 2 parts together to form a single sorted array.
 *
 * Time complexity: O(n * log n) - where n is length of the array. Because the array is divided into halves recursively until each subarray contains only one element, and then merged back together in sorted order.
 *
 * Space complexity: O(n) - because the additional space is required to store the left and right subarrays during the merge process
 *
 */
const sortArray = (nums) => {
  mergeSort(nums, nums.length);
  return nums;
};

const mergeSort = (nums, length) => {
  if (length === 1) {
    return;
  }

  // Split the array into 2 slices
  let mid = Math.floor(length / 2);
  let left = new Array(mid);
  let right = new Array(length - mid);

  // Clone the first half of the array to the left slice
  for (let i = 0; i < mid; i++) {
    left[i] = nums[i];
  }

  // Clone the second half of the array to the right slice
  for (let i = 0; i < length - mid; i++) {
    right[i] = nums[i + mid];
  }

  mergeSort(left, mid);
  mergeSort(right, length - mid);

  // Exit the recursion
  mergeSortedArray(left, mid, right, length - mid, nums);
};

const mergeSortedArray = (left, leftLength, right, rightLength, nums) => {
  let i = 0;
  let j = 0;
  let count = 0;

  while (i < leftLength && j < rightLength) {
    if (left[i] < right[j]) {
      nums[count++] = left[i++];
    } else {
      nums[count++] = right[j++];
    }
  }

  // Copy remaining elements from left array (if any)
  while (i < leftLength) {
    nums[count++] = left[i++];
  }

  // Copy remaining elements from right array (if any)
  while (j < rightLength) {
    nums[count++] = right[j++];
  }
};

/**
 * Quick Sort Approach: We will randomly pick a element in the array. After that, we use that random element for comparison to move all the elements are less than the random element to the left of the array, and move all the elements are greater than the random element to the right of the array.
 *
 * This implementation utilizes a random pivot selection strategy. Instead of choosing the first or last element as the pivot, it picks a random element within the sub-section.
 *
 * This helps to avoid the worst-case scenario of Quick Sort, which occurs when the pivot is always the smallest or largest element, leading to imbalanced partitions and O(n^2) time complexity.
 *
 * 1. We recursively sort a subarray of the nums array between indices start and end (inclusive).
 * 2. With the base case, if start is greater than or equal to end, it means the subarray has zero or one element (already sorted) and the function returns.
 * 3. The randomIdx is calculated as a random index within the subarray (between start and end inclusive) using Math.random.
 * 4. We swap the value at randomIdx (the pivot) with the element at the end of the subarray (end). This places the pivot at the last position for now.
 * 5. Next, we iterate through the subarray (start to end-1):
 * - 5.1: If the current element (nums[i]) is less than the pivot (randomValue), it means it belongs to the left half (smaller elements)
 * - 5.2: The current element is swapped with the element at currentIdx
 * - 5.3: The currentIdx is incremented to keep track of the position for the next element less than the pivot.
 *
 * 6. After the loop, the pivot element (originally at end) is swapped with the element at the currentIdx position. This effectively places the pivot in its correct sorted position, where all elements to its left are less than it and all elements to its right are greater than it.
 *
 * 7. We call 2 recursive quick sort functions:
 * - 7.1: Sort the left half of the subarray (from start to currentIdx - 1), excluding the pivot.
 * - 7.2: Sort the right half of the subarray (from currentIdx + 1 to end), excluding the pivot.
 *
 * Time complexity:
 * - Average Case: O(n log n)
 * - Worst Case: O(n^2)
 *
 * Space complexity: O(log n)
 *
 */
const sortArray = (nums) => {
  quickSort(nums, 0, nums.length);
  return nums;
};

const quickSort = (nums, start, end) => {
  if (start >= end) return;

  // Pick random element from the array
  let randomIdx = Math.floor(Math.random() * (end - start + 1)) + start;
  let randomValue = nums[randomIdx];
  let currentIdx = start;

  // Move random index to the end of the array
  swap(nums, randomIdx, end);

  // Move all the smaller element to the left
  for (let i = start; i < end; i++) {
    if (nums[i] < randomValue) {
      // Swap position of current index and current number
      // Move element to the left of the array
      swap(nums, currentIdx, i);
      currentIdx++;
    }
  }

  // Swap to correct position of the current index and end value
  swap(nums, currentIdx, end);

  // Use quickSort recursion to sort the left (first half) of the array
  quickSort(nums, start, currentIdx - 1);

  // Use quickSort recursion to sort the right (second half) of the array
  quickSort(nums, currentIdx + 1, end);
};

/**
 *
 * This idea is the same as the quickSort solution above. The difference is that instead of moving all the smaller elements to left, we will move all the larger elements to right as well.
 *
 * For example: nums = [1, 2, 2, 2, 2, 2, 2, 2, 7, 8, 10], in this case we have a list of adjacent elements that have the same value, we don't need to re-modify it, we'll skip it and move to the next comparable elements.
 *
 * 1. We recursively sort a subarray of the nums array between indices start and end (inclusive).
 * 2. With the base case, if start is greater than or equal to end, it means the subarray has zero or one element (already sorted) and the function returns.
 * 3. The randomIdx is calculated as a random index within the subarray (between start and end inclusive) using Math.random.
 * 4. Next, we iterate through the subarray and move the smaller element to the left of the array (start to end-1):
 * - 4.1: If the current element (nums[i]) is less than the pivot (randomValue), it means it belongs to the left half (smaller elements)
 * - 4.2: The current element is swapped with the element at left index
 * - 4.3: The left index is incremented to keep track of the position for the next element less than the pivot.
 *
 * 5. Next, we iterate through the subarray and move the bigger element to the right of the array (end to start):
 * - 5.1: If the current element (nums[i]) is greater than the pivot (randomValue), it means it belongs to the right half (bigger elements)
 * - 5.2: The current element is swapped with the element at right index
 * - 5.3: The right index is incremented to keep track of the position for the next element less than the pivot.
 *
 * 6. We call 2 recursive quick sort functions:
 * - 6.1: Sort the left half of the subarray (from start to currentIdx - 1), excluding the pivot.
 * - 6.2: Sort the right half of the subarray (from currentIdx + 1 to end), excluding the pivot.
 *
 * Time complexity:
 * - Average Case: O(n log n)
 * - Worst Case: O(n^2)
 *
 * Space complexity: O(log n)
 *
 */
const quickSortMoreOptimal = (nums, start, end) => {
  if (start >= end) return;

  // Pick random element from the array
  let randomIdx = Math.floor(Math.random() * (end - start + 1)) + start;
  let randomValue = nums[randomIdx];

  // Move all the smaller element to the left
  let left = start;
  for (let i = start; i <= end; i++) {
    if (nums[i] < randomValue) {
      // Swap position of current index and current number
      // Move element to the left of the array
      swap(nums, left, i);
      left++;
    }
  }

  // Move all the bigger element to the right
  let right = end;
  for (let i = end; i >= start; i--) {
    if (nums[i] > randomValue) {
      // Swap position of current index and current number
      // Move element to the right of the array
      swap(nums, right, i);
      right--;
    }
  }

  // Use quickSort recursion to sort the left (first half) of the array
  quickSort(nums, start, left - 1);

  // Use quickSort recursion to sort the right (second half) of the array
  quickSort(nums, right + 1, end);
};

const swap = (nums, left, right) => {
  [[nums[left], nums[right]]] = [[nums[right], nums[left]]];
};

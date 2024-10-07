/**
 * https://leetcode.com/problems/find-peak-element/description/
 *
 * Brute Force Approach: Loop through each element in the array and find the peak. A element is considered as a peak if it's greater than its previous element.
 *
 * Time complexity: O(n) - where n is the length of the array
 *
 * Space complexity: O(1)
 */
const findPeakElementBruteForce = (nums) => {
  let left = 0;
  let peak = 0;

  // We iterate through each element until we reach the end of the array
  while (left < nums.length) {
    let current = nums[left];
    let previous = nums[left - 1];

    // If the current element is greater than its previous element
    // That means we found a peak
    let isPeak = previous !== undefined && current > previous;

    if (isPeak) {
      // We update the peak variable by the new peak index
      peak = left;
    }

    // Move to the next element
    left += 1;
  }

  return peak;
};

/**
 * Binary Search Approach: The idea is to split the array into two slices and find the potential peak in one of these 2 slices. But which slice should we find for?
 *
 * First case: nums = [1,2,1,3,5,6,4]
 *
 * In this example, there are 2 peaks are at the index 1 (value of 2), and 5 (value of 6). A peak is the element that is greater than its neighbors, in this case, 1 < 2 > 1 and 5 < 6 > 4 => we found a condition: previous < peak > next
 *
 * Second case: nums = [1,2]
 *
 * In this example, there is only one peak are at the index 1 (value of 2), as the condition we found in the first case example, in this case, there is no next value, so we assume that the next value will be less than the current potential peak. => previous < peak
 *
 * Third case: nums = [3,2,1]
 *
 * In this example, there is only one peak are at the index 0 (value of 3), as the condition we found in the first case example, in this case, there is no previous value, so we assume that the previous value will be less than the current potential peak. => peak > next
 *
 * In general, we want to find the element that is always greater than its neighbors, therefore, in this case, we will find the potential peak in the slice than has greater elements.
 *
 * Implementation:
 *
 * 1. We initialize left starts from 0 and right starts from the last element of the array.
 * 2. As long as there is element in the range from left to right.
 * 3. We get the middle element.
 * 4. We make sure that there is a previous element (mid > 0) and if the current middle element is less than the previous element, that means the greater slice is in the left of the array. We move the right pointer to the left to find potential peak in the left.
 * 5. We make sure that there is a next element (mid < right) and if the current middle element is less than the next element, that means the greater slice is in the right of the array. We move the left pointer to the right to find potential peak in the right.
 * 6. If we found a peak, we return its index.
 *
 * Time complexity: O(log n)
 *
 * Space complexity: O(1)
 */
const findPeakElement = (nums) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    let current = nums[mid];
    let previous = nums[mid - 1];
    let next = nums[mid + 1];

    if (mid > 0 && current < previous) {
      right = mid - 1;
    } else if (mid < right && current < next) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return 0;
};

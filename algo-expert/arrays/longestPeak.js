/**
 * QUESTION
 *
 * Write a function that takes in an array of integers and returns the length of the longest peak in the array.
 *
 * A peak is defined as adjacent integers in the array that are strictly increasing until they reach a tip (the highest value in the peak), at which point they become strictly decreasing. At least three integers are required to form a peak.
 *
 * For example, the integers `1, 3, 10, 2` form a peak, but the integers `4, 0, 10` don't and neither do the integers `1, 2, 2, 0`. Similarly, the integers `1, 2, 3` don't form a peak because there aren't any strictly decreasing integers after the 3
 *
 * Sample Input:
 * array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
 *
 * Sample Output:
 * 6 // 0, 10, 6, 5, -1, -3
 */

/**
 * SOLUTION 1
 * 
 * The idea is to find all the possible peaks and then calculate the length to find the longest one
 * 
 * The time complexity of this function is O(n), where n is the number of elements in the input array. This is because the function iterates through the array once to find all the peaks and calculate the longest peak.

 * The space complexity of this function is O(1) because the function only uses a constant amount of extra space regardless of the size of the input array. This is because the function only uses a few variables to keep track of the current peak and longest peak length.
 */
const longestPeak = (array) => {
  let longestPeak = 0;
  let currentLongestPeak;
  let i = 0;
  let leftIdx = 0;
  let rightIdx = 0;

  // We only loop through the array until we reach the edge of
  while (i < array.length - 1) {
    let currentValue = array[i];
    let previousValue = array[i - 1];
    let nextValue = array[i + 1];
    // We know current value is tip of the peak
    // if current value is strictly greater than both adjacent values
    let isPeak = currentValue > previousValue && currentValue > nextValue;

    // If we have not found a tip of the peak
    // We'll continue to traverse through the next available value
    if (!isPeak) {
      i += 1;
      continue;
    }

    // Otherwise, If we've found a tip of the peak, then we know that we found a peak
    // After that, we'll expending to the left and the right until either we ran out of bounds
    // Or until we no longer had strictly decreasing numbers to the left and to the right to calculate the length of the peak
    // At the left, we decrease index by 2 because we already know that
    // the nearest left value of current tip is already a part of the peak
    // then, we don't need to start calculate from it
    leftIdx = i - 2;
    // As long as we're in bound of the array
    // And the left value is less than the its nearest right value
    // We keep decrease the left index by 1 until we can not find the strictly decreasing number
    while (leftIdx >= 0 && array[leftIdx] < array[leftIdx + 1]) {
      leftIdx -= 1;
    }

    // As the same with the left, we increase the index by 2
    rightIdx = i + 2;
    // As long as we're in bound of the array
    // And the right value is less than the its nearest left value
    // We keep decrease the right index by 1 until we can not find the strictly decreasing number
    while (rightIdx < array.length && array[rightIdx] < array[rightIdx - 1]) {
      rightIdx += 1;
    }

    // Find the longest peak by finding the biggest value between current longest peak and longest peak
    // We calculate the current longest peak by calculating the length between 2 indices left and right, and then update the longest peak
    currentLongestPeak = rightIdx - leftIdx - 1;
    longestPeak = Math.max(longestPeak, currentLongestPeak);

    // Finally, update the index as we figured out that we were past our current peak
    // In here, we start the over again at the index of the right
    // Because at this time, the right index is at the value that
    // Nearest value of the last element of the current peak
    // We start the next iteration at the right because we already know that
    // All of right element of the previous peak are already traversed, and could not possible to find a tip in those value, then we'll pass through the next potential tip to keep traversing
    i = rightIdx;
  }

  return longestPeak;
};

const array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3];
const array1 = [1, 1, 3, 2, 1];
const array2 = [1, 3, 2];
const array3 = [5, 4, 3, 2, 1, 2, 10, 12];
const array4 = [
  1, 1, 1, 2, 3, 10, 12, -3, -3, 2, 3, 45, 800, 99, 98, 0, -1, -1, 2, 3, 4, 5,
  0, -1, -1,
];

console.log(longestPeak(array)); // 6
console.log(longestPeak(array1)); // 4
console.log(longestPeak(array2)); // 3
console.log(longestPeak(array3)); // 0
console.log(longestPeak(array4)); // 9

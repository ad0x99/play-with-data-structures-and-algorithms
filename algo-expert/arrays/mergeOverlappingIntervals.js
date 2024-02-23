/**
 * QUESTION
 *
 * Write a function that takes in a non-empty array of arbitrary intervals, merges any overlapping intervals, and returns the new intervals in no particular order. Two intervals are overlapping if they share any of the same values in their range.
 *
 * Each interval `interval` is an array of 2 integers, with `interval[0]` as the start of the interval, and `interval[1]` as the end of the interval.
 *
 * Note that back-to-back intervals aren't considered to be overlapping. For example, [1, 5] and [6, 7] are not overlapping; however, [1, 6] and [6, 7] are indeed overlapping.
 *
 * Also note that the start of any particular interval will always be less than or equal to the end of that interval.
 *
 * Sample Input:
 * intervals = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]
 *
 * Sample Output:
 * [[1, 2], [3, 8], [9, 10]]
 * // Merge the intervals [3, 5], [4, 7], and [6, 8].
 * // The intervals could be ordered differently
 */

/**
 * SOLUTION 1
 *
 * The time complexity of this function is O(n log n). The code first sorts the input array of intervals based on the start time of each interval, which takes O(n log n) time complexity. Then, it iterates through the sorted intervals once, which is O(n). Therefore, the overall time complexity is O(n log n).
 *
 * The space complexity is O(n) because the function creates a new array of the same length as the input array to store the merged intervals.
 */
const mergeOverlappingIntervals = (array) => {
  // We sort the array by the first interval
  let sortedIntervals = array.sort((a, b) => a[0] - b[0]);
  let mergedIntervals = [];
  // Add the first interval to the merged intervals as initial value
  let currentInterval = sortedIntervals[0];
  mergedIntervals.push(currentInterval);

  // Loop through the array
  for (let nextInterval of sortedIntervals) {
    let [_, currentIntervalEnd] = currentInterval;
    let [nextIntervalStart, nextIntervalEnd] = nextInterval;

    // If the end value of first interval is greater than or equal to the start value of second interval => overlap
    if (currentIntervalEnd >= nextIntervalStart) {
      // We compare and get the greater value between current interval end and the next interval end
      // And then update the end value of the first interval to be the greater value
      currentInterval[1] = Math.max(currentIntervalEnd, nextIntervalEnd);
    } else {
      // Otherwise, we add the current interval to merged interval array
      currentInterval = nextInterval;
      mergedIntervals.push(currentInterval);
    }
  }

  return mergedIntervals;
};

const intervals1 = [
  [1, 2],
  [3, 5],
  [4, 7],
  [6, 8],
  [9, 10],
];
const intervals2 = [
  [1, 3],
  [2, 8],
  [9, 10],
];
const intervals3 = [
  [1, 10],
  [10, 20],
  [20, 30],
  [30, 40],
  [40, 50],
  [50, 60],
  [60, 70],
  [70, 80],
  [80, 90],
  [90, 100],
];
const intervals4 = [
  [1, 10],
  [11, 20],
  [21, 30],
  [31, 40],
  [41, 50],
  [51, 60],
  [61, 70],
  [71, 80],
  [81, 90],
  [91, 100],
];
const intervals5 = [
  [100, 105],
  [1, 104],
];
const intervals6 = [
  [89, 90],
  [-10, 20],
  [-50, 0],
  [70, 90],
  [90, 91],
  [90, 95],
];
const intervals7 = [
  [-5, -4],
  [-4, -3],
  [-3, -2],
  [-2, -1],
  [-1, 0],
];
const intervals8 = [
  [43, 49],
  [9, 12],
  [12, 54],
  [45, 90],
  [91, 93],
];
const intervals9 = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
const intervals10 = [
  [2, 3],
  [4, 5],
  [6, 7],
  [8, 9],
  [1, 10],
];
console.log(mergeOverlappingIntervals(intervals1)); // [[1, 2], [3, 8], [9, 10]]
console.log(mergeOverlappingIntervals(intervals2)); // [[1, 8], [9, 10]]
console.log(mergeOverlappingIntervals(intervals3)); // [[1, 100]]
console.log(mergeOverlappingIntervals(intervals4)); // [[1, 10], [11, 20], [21, 30], [31, 40], [41, 50], [51, 60], [61, 70], [71, 80], [81, 90], [91, 100]]
console.log(mergeOverlappingIntervals(intervals5)); // [[1, 105]]
console.log(mergeOverlappingIntervals(intervals6)); // [[-50, 20], [70, 95]]
console.log(mergeOverlappingIntervals(intervals7)); // [[-5, 0]]
console.log(mergeOverlappingIntervals(intervals8)); // [[9, 90], [91, 93]]
console.log(mergeOverlappingIntervals(intervals9)); // [[0, 0]]
console.log(mergeOverlappingIntervals(intervals10)); // [[1, 10]]

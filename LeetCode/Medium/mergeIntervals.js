/**
 * https://leetcode.com/problems/merge-intervals/description/
 *
 * Sorting Approach
 *
 * Idea: Overlapping intervals refer to two or more intervals that share a common time range. Since, the each range can be placed in any order in the intervals array. Therefore, we need to sort the intervals first in the ascending order to make sure that overlapping intervals will be consecutive in the sorted array.
 *
 * After sorting the array, we can compare the previous interval with the current one to indicate it's overlapping or not.
 *
 * Implementation:
 *
 * 1. We sort the `intervals` array in ascending order using the `start` and `end` values.
 *
 * 2. We initialize an empty array `result` to store the merged intervals and we add the first interval to the result array as the initial value.
 *
 * 3. We iterate through each interval `[start, end]` in the sorted intervals array.
 * - 3.1: We retrieve the `end value` of the last interval from the `result` array for comparison.
 *
 * - 3.2: We check if the current interval's starting point (`start`) is less than or equal to the last interval's ending point (`lastEnd`). This indicates an overlap.
 *
 * - 3.3: If there's an overlap, we update the ending point of the last interval in the result array by getting the `maximum` value between the `lastEnd` and `current end`. This ensures the merged interval covers the entire overlapping range.
 *
 * - 3.4: Otherwise, If there's no overlap, it means the current interval doesn't overlap with the previous ones. We push a new interval to the result array to represent a separate non-overlapping interval
 *
 * 4. We return the `result` array as sorted intervals array.
 *
 * For example:
 *
 * Initial Intervals:   [ [1, 3], [2, 6], [8, 10], [15, 18] ]
 * Sort Intervals:      [ [1, 3], [2, 6], [8, 10], [15, 18] ]
 *                      |
 *                      v
 *                    Result: [ [1, 3] ]
 *                      |
 *                      v
 *       ---------------------------------------
 *       |                |                    |
 *   Current Interval  Current Interval   Current Interval
 *       [2, 6]            [8, 10]           [15, 18]
 *       Overlap: Yes      Overlap: No        Overlap: No
 *       Merge to:         Add to Result      Add to Result
 *       [1, 6]            [8, 10]            [15, 18]
 *       |                 |                  |
 *       v                 v                  v
 *  Result: [ [1, 6], [8, 10], [15, 18] ]
 *
 * Time complexity: O(n log n), where n is the number of intervals. Because we sort the array and iterate through each interval once.
 *
 * Space complexity: O(n), where n is the number of intervals in the result array.
 */
const merge = (intervals) => {
  // Sort the intervals based on the start time, and if equal, based on the end time
  intervals.sort((a, b) => {
    return a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1];
  });

  const result = [intervals[0]];

  for (const [start, end] of intervals) {
    const lastEnd = result[result.length - 1][1];

    // Merge the overlapping intervals
    if (start <= lastEnd) {
      result[result.length - 1][1] = Math.max(lastEnd, end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
};

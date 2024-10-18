/**
 * https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position/
 *
 * Dynamic Programming Approach (TLE)
 *
 * Time complexity: O(n ^ 2), where n is the length of obstacles array.
 *
 * Space complexity: O(n), where n is the length of dp array.
 */
const longestObstacleCourseAtEachPosition = (obstacles) => {
  const n = obstacles.length;
  const dp = new Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (obstacles[i] >= obstacles[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return dp;
};

/**
 *
 * Binary Search Approach
 *
 * Idea: We want to find longest subarray where the next position is always greater than or equal to the previous one. That means, we will form a non-decreasing subsequence of obstacles.
 *
 * 1. We initialize an `subarray` array to store the current non-decreasing subsequence of obstacles, and an `ans` array to store the length of subarray at each position.
 *
 * 2. We iterate through each obstacle.
 *
 * 3. If the current subarray is empty or the current obstacle is greater than or equal to the previous on from subarray, we add the current obstacle to the subarray and add the current subarray length to the ans which represents the longest length of current subsequence of obstacles.
 *
 * 4. Otherwise, if the current obstacle is less than the previous one, we perform binary search to find the obstacle which is greater than current obstacle from subarray. We want to find the greater one to be able to replace that greater one with the current one to make sure that the subarray always is the longest non-decreasing subsequence.
 *
 * 5. After finding the greater obstacle, we update the obstacle at the `index` position in the subarray with the current obstacle. And we push the `index + 1` to the `ans` array. This represents the new length of the longest non-decreasing subsequence at this position, considering the insertion of num.
 *
 * 6. We return the `ans` array containing the length of the longest non-decreasing subsequence for each position in the original obstacles array.
 *
 * Time complexity: O(n * log n), where n is the length of obstacles array.
 *
 * Space complexity: O(n), where n is the length of subarray array.
 */
const longestObstacleCourseAtEachPosition = (obstacles) => {
  let subarray = [];
  let ans = [];

  for (const num of obstacles) {
    if (!subarray.length || num >= subarray[subarray.length - 1]) {
      subarray.push(num);
      ans.push(subarray.length);
    } else {
      const index = upperBound(subarray, num);
      subarray[index] = num;
      ans.push(index + 1);
    }
  }

  return ans;
};

const upperBound = (array, target) => {
  let left = 0;
  let right = array.length - 1;
  let ans = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let currentMid = array[mid];

    if (currentMid > target) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
};

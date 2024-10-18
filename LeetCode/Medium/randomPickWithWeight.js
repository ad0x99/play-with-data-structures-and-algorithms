/**
 * https://leetcode.com/problems/random-pick-with-weight/
 *
 * Binary Search Approach
 *
 * Idea: Build a prefix sum array to contain the sum of all previously calculated element at each position. Based on the sum, we will randomly pick the element in the prefix sum array.
 *
 * 1. We build a prefix sum array to store the sum of all previously calculated element at each position.
 *
 * 2. In the pickIndex method, we use binary search (lower bound technique) to find the element based on the randomly generated weight value (randomWeight).
 *
 * Time complexity:
 * - Solution: O(n), where n is the length of w array.
 * - pickIndex: O(log n), where n is the length of prefixSum array.
 *
 * Space complexity:
 * - Solution: O(n), where n is the length of prefixSum array.
 * - pickIndex: O(1)
 */
var Solution = function (w) {
  this.prefixSum = new Array(w.length).fill(0);
  this.sum = 0;

  for (let i = 0; i < w.length; i++) {
    this.sum += w[i];
    this.prefixSum[i] = this.sum;
  }
};

Solution.prototype.pickIndex = function () {
  let randomWeight = Math.floor(Math.random() * this.sum);
  let left = 0;
  let right = this.prefixSum.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (randomWeight < this.prefixSum[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

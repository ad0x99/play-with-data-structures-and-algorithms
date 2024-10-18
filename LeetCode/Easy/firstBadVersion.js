/**
 * https://leetcode.com/problems/first-bad-version/description/
 *
 * Binary Search Approach: Because we want to find out the first bad one, we will split the range into 2 slices, and look for the first bad version at each slice.
 *
 * 1. We initialize the left starts from 0 and the right starts from n. We use a ans variable to keep track the best potential bad version and initialize it a random value, in this case will be -1.
 * 2. As long as there is element in the range, we split the range into 2 slices, get the middle element and assign it to the mid variable.
 * 3. If the current mid element is a bad version, we update the ans to be the current mid (aka the bad version), and remove all the contribution of the right side to find the potential bad version in the left side.
 * 4. Otherwise, we increase the left and remove all the contribution of the left side to find the potential bad version in the right side.
 * 5. Return ans as we iterated through all the elements in the range.
 *
 * Time complexity: O(log n)
 *
 * Space complexity: O(1)
 */
const solution = (isBadVersion) => {
  return function (n) {
    let left = 0;
    let right = n;
    let ans = -1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      // In case the sum of left and right is too large, and we want to prevent the integer overflow
      // let mid = Math.floor(left + (right - left) / 2);

      if (isBadVersion(mid)) {
        ans = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return ans;
  };
};

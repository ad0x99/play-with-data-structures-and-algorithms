/**
 * https://leetcode.com/problems/merge-sorted-array/description/
 *
 * The idea is to using 3 pointers to keep track elements and comparing between 2 arrays
 *
 * 1. The 2 pointers (i & j) start from the last element of the first and second arrays, and the third pointer (k) starts from the last element of the final array.
 * 2. As long as i and j are not out of bounds, we iterate through both arrays
 * 3. We compare the current number of the first array and the current number of the second array
 * 4. If the current number of first array is greater than current number of second array, we put the current number of first array at the k position and decrease i by one to move to the next number
 * 5. Otherwise, if the current number of first array is less than current number of second array, we put the current number of second array at the k position and decrease j by one to move to the next number
 * 6. After each iteration, we decrease k by one to move to the next empty position
 * 7. In the case, if the second pointer is greater or equal to zero, that means we iterated all the elements in the second array, we can assume that the first array should be sorted already. Then we update the current number of second array at k position and decrease j and k by 1 sequentially. At this time, the i and k will have the same position.
 *
 * Time complexity : O(1) * (m + n) => O(m + n)
 * Space complexity : O(3) => O(1)
 */
const mergeSortedArray = (nums1, m, nums2, n) => {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (i >= 0 && j >= 0) {
    let currentFirstNum = nums1[i];
    let currentSecondNum = nums2[j];

    if (currentFirstNum > currentSecondNum) {
      nums1[k] = currentFirstNum;
      i -= 1;
    } else {
      nums1[k] = currentSecondNum;
      j -= 1;
    }

    k -= 1;
  }

  while (j >= 0) {
    nums1[k] = nums2[j];
    j -= 1;
    k -= 1;
  }

  return nums1;
};

const nums1 = [1, 2, 3, 0, 0, 0];
//                   i        k
const nums2 = [2, 5, 6];
//                   j
const m = 3;
const n = 3;
console.log(mergeSortedArray(nums1, m, nums2, n)); // [ 1, 2, 2, 3, 5, 6 ]

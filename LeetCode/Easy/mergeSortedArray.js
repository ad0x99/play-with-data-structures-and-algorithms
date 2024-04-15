/**
 * https://leetcode.com/problems/merge-sorted-array/description/
 *
 * Two Pointers Approach: The idea is to using 3 pointers to keep track elements and comparing between 2 arrays
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

/**
 * Two Pointers Approach: The idea is the same as the above solution. This solution is not as optimal as the first solution, but give you more clear idea how this algorithm works.
 *
 * 1. We create 3 pointers which are i, j, k
 * - 1.1: The i is used for iterating through elements in the first array
 * - 1.2: The j is used for iterating through elements in the first array
 * - 1.3: The k is used for tracking the index and replace the element in the correct order
 *
 * 2. We create a result array to store the sorted list.
 * 3. As long as there are elements in both arrays:
 * 4. If the first array's element is less than the second array's element
 * - 4.1: We push the first array's element to the result
 * - 4.2: Increase k by 1 to move to the next result's position
 * - 4.3: Increase i by 1 to move to the next nums1's element
 *
 * 5. Otherwise, if the first array's element is greater than the second array's element
 * - 5.1: We push the second array's element to the result
 * - 5.2: Increase k by 1 to move to the next result's position
 * - 5.3: Increase j by 1 to move to the next nums2's element
 *
 * 6. If one of both array is out of bounds.
 * - 6.1: If there are elements in the first array, we push the first array's remaining elements to the result
 * - 6.2: If there are elements in the second array, we push the second array's remaining elements to the result
 *
 * 7. Update the result array's elements to the first array.
 * 8. Return the first array as sorted array.
 *
 * Time complexity: O(m + n) because we iterate through both input arrays nums1 and nums2 once to merge them into a single sorted array.
 *
 * Space complexity: O(m + n) because we create a new array of size m + n to store the merged result.
 */
const mergeSortedArray = (nums1, m, nums2, n) => {
  let i = 0;
  let j = 0;
  let k = 0;
  let result = new Array(m + n);

  while (i < m && j < n) {
    if (nums1[i] < nums2[j]) {
      result[k] = nums1[i];
      k++;
      i++;
    } else {
      result[k] = nums2[j];
      k++;
      j++;
    }
  }

  while (i < m) {
    result[k] = nums1[i];
    k++;
    i++;
  }

  while (j < n) {
    result[k] = nums2[j];
    k++;
    j++;
  }

  for (let num = 0; num < m + n; num++) {
    nums1[num] = result[num];
  }

  return nums1;
};

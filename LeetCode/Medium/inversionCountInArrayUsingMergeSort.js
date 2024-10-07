/**
 * https://www.geeksforgeeks.org/inversion-count-in-array-using-merge-sort/
 *
 * Brute Force Approach: A inversion is formed if arr[i] > arr[j] and i < j, therefore, we'll iterate through each element of the array and do the comparison if arr[i] > arr[j], that means we found a conversion.
 *
 * This solution is quite slow and will reach the Time Limit Exceeded error.
 *
 * Time complexity: O(n) * O(n) = (N^2)
 *
 * Space complexity: O(1)
 */
class Solution {
  inversionCount(arr, N) {
    let countInversion = 0;

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (arr[i] > arr[j]) {
          countInversion += 1;
        }
      }
    }

    return countInversion;
  }
}

/**
 *
 * Divide & Conquer with Merge Sort Approach: The idea is to divide the problem into smaller one, do the calculation for the smaller one and merge them together.
 *
 * For example: arr = [3, 5, 2, 1, 6]
 *
 * -            [3, 5] | [2, 1, 6]
 * -            [3] - [5] | [2, 1, 6]
 * - inversion:     4 - (3, 2), (3, 1), (5, 2), (5, 1)
 * -            [3] - [5] | [2] - [1, 6]
 * - inversion:     0          1 - (2, 1)
 *
 * => Total of inversion: 4 + 1 = 5
 *
 * Time complexity: O(n log n) - where n is the length of the array
 *
 * Space complexity: O(n)
 */
class Solution1 {
  inversionCount(arr, N) {
    return this.mergeSort(arr);
  }

  mergeSort(arr) {
    let n = arr.length;
    if (n === 1) return 0;

    // Divide the array into two parts which are leftHaft and rightHaft
    let mid = Math.floor(n / 2);
    let leftHalf = arr.slice(0, mid);
    let rightHalf = arr.slice(mid);

    // Recursively sort and count inversions in halves
    let [leftInversions, leftSortedArray] = this.mergeSort(leftHalf);
    let [rightInversions, rightSortedArray] = this.mergeSort(rightHalf);

    // Merge halves and count inversions during merge
    let [mergeInversions, sortedArray] = this.mergeTwoSortedArray(
      leftSortedArray,
      rightSortedArray
    );

    // Total inversions are sum of inversions in halves and during merge
    const totalInversions = leftInversions + rightInversions + mergeInversions;

    return [totalInversions, sortedArray];
  }

  mergeTwoSortedArray(leftArr, rightArr) {
    let i = 0;
    let j = 0;
    const m = leftArr.length;
    const n = rightArr.length;
    const sortedArr = [];
    let inversionCount = 0;

    while (i < m && j < n) {
      // Sort the array
      if (leftArr[i] <= rightArr[j]) {
        sortedArr.push(leftArr[i]);
        i++;
      } else {
        // leftArr[i] > rightArr[j]
        sortedArr.push(rightArr[j]);

        // Count inversions
        inversionCount += m - i;
        j++;
      }
    }

    // If there are elements in one of both array
    // Append remaining elements
    while (i < m) {
      sortedArr.push(leftArr[i]);
      i++;
    }
    while (j < n) {
      sortedArr.push(rightArr[j]);
      j++;
    }

    // Return inversions and sorted array
    return [inversionCount, sortedArr];
  }
}

const a = new Solution();
console.log(a.inversionCount([3, 5, 2, 1, 6], 5)); // 5
console.log(a.inversionCount([2, 4, 1, 3, 5], 5)); // 3
console.log(a.inversionCount([2, 3, 4, 5, 6], 5)); // 0
console.log(a.inversionCount([10, 10, 10], 5)); // 0

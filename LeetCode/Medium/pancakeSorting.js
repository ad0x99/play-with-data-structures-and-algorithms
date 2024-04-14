/**
 * https://leetcode.com/problems/pancake-sorting/description/
 *
 * Selection Sort Approach: The idea is to flip the largest element in the subarray to the beginning first, and then flip the subarray again to move the maximum element to the end.
 *
 * For example: array = [3, 2, 4, 1]
 *                               cur
 * Flip 1: maxVal = 4, curIdx = 3
 * - First flip:  flip [3, 2, 4, 1] => [4, 2, 3, 1]
 * - Second flip: flip [4, 2, 3, 1] => [1, 3, 2, 4]
 *
 * Flip 2: maxVal = 3, curIdx = 2
 * - First flip:  flip [1, 3, 2, 4] => [3, 1, 2, 4]
 * - Second flip: flip [3, 1, 2, 4] => [2, 1, 3, 4]
 *
 * Flip 3: maxVal = 2, curIdx = 1
 * - First flip:  flip [2, 1, 3, 4] => [2, 1, 3, 4]
 * - Second flip: flip [2, 1, 3, 4] => [1, 2, 3, 4]
 *
 * Implementation:
 *
 * 1. We initialize `sequenceOfPancakeFlips` to store the sequence of flip steps.
 * 2. We start the iteration from the end of the array.
 * 3. As long as there is element to flip.
 * 4. Firstly, we need to find the maximum element of the current subarray.
 * 5. After getting the maximum element, we need to flip twice:
 * - 5.1: We will flip the maximum element to the beginning of the subarray array.
 * - 5.2: We will flip the maximum element to the end of the array.
 *
 * 6. We decrease current index by 1 to move to the next subarray.
 *
 * Time complexity: O(n) * O(n) = O(n^2)
 *
 * Space complexity: O(1)
 */
const pancakeSort = (arr) => {
  let sequenceOfPancakeFlips = [];
  let currentIndex = arr.length - 1;

  while (currentIndex >= 0) {
    // Find the index of the largest element in the remaining subarray
    let maxIndex = currentIndex;
    for (let i = 0; i < currentIndex; i++) {
      if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }
    }

    // Flip the subarray to move the maximum element to the beginning
    flip(arr, maxIndex);
    sequenceOfPancakeFlips.push(maxIndex + 1);

    // Flip the subarray again to move the maximum element to the end (now at currentIndex)
    flip(arr, currentIndex);
    sequenceOfPancakeFlips.push(currentIndex + 1);

    // Move to the next element
    currentIndex--;
  }

  return sequenceOfPancakeFlips;
};

/**
 * The idea is the same as the solution above but different implementation
 */
const pancakeSortMoreOptimal = (arr) => {
  let sequenceOfPancakeFlips = [];

  for (let currentIndex = arr.length - 1; currentIndex > 0; currentIndex--) {
    // Find the index of the largest element in the remaining subarray
    let maxIndex = 0;
    for (let i = 1; i <= currentIndex; i++) {
      if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }
    }

    // Flip the subarray to move the maximum element to the beginning
    if (maxIndex != 0) {
      flip(arr, maxIndex);
      sequenceOfPancakeFlips.push(maxIndex + 1);
    }

    // Flip the subarray again to move the maximum element to the end (now at currentIndex)
    flip(arr, currentIndex);
    sequenceOfPancakeFlips.push(currentIndex + 1);
  }

  return sequenceOfPancakeFlips;
};

const flip = (arr, target) => {
  let left = 0;
  let right = target;

  while (left <= right) {
    // Swap left and right positions
    [arr[left], arr[right]] = [arr[right], arr[left]];

    left++;
    right--;
  }
};

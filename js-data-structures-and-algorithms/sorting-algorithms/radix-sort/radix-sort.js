// @ts-nocheck
import {
  countNumOfDigits,
  getDigit,
  getKthDigit,
  mostDigits,
} from './radix-helper.js';

/**
 *
 * Radix sort is a non-comparative sorting algorithm that works efficiently on non-negative integer arrays. It sorts the elements by their individual digits, starting from the least significant digit (LSD) or the most significant digit (MSD), depending on the implementation.
 *
 * Implementation
 *
 * 1. We find the maximum number of digits using the function mostDigits and store that result to the maxDigitCount variable.
 * 2. We iterate through each digit position (k) from 0 (least significant digit) to maxDigitCount - 1 (most significant digit)
 * 3. Inside the loop, we initialize the digitBucket with size of 10. This array acts as buckets to hold elements based on their digit value at the current position k.
 * 4. In the next iteration, we iterate through each element in the original array.
 * - 4.1: We extracts the digit at position k from the current number using getDigit function and store the current digit to the digit variable.
 * - 4.2: We use the extracted digit (stored in digit variable) is used as the index to access a specific bucket in digitBuckets.
 * - 4.3: We push the current element (arrayOfNumbers[i]) into the corresponding bucket (digitBuckets[digit]) based on its digit value at position k.
 *
 * 5. After iterating through all elements, the arrayOfNumbers is updated using the spread operator ([]...) to combine all elements from the digitBuckets array back into a single array. The order within each bucket is preserved.
 * 6. The loop in step 2 iterates for maxDigitCount times, ensuring each digit position is handled. With each iteration, elements are sorted based on the digit at the current position k.
 * 7. After all digit positions are processed, we return the sorted array (arrayOfNumbers).
 *
 * Time complexity: O(n * k) - where n is the length of the array, and k is the largest number of digits in the elements
 *
 * Space complexity: (n)
 */
const radixSort1 = (arrayOfNumbers) => {
  let maxDigitCount = mostDigits(arrayOfNumbers);

  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < arrayOfNumbers.length; i++) {
      let digit = getDigit(arrayOfNumbers[i], k);
      digitBuckets[digit].push(arrayOfNumbers[i]);
    }

    arrayOfNumbers = [].concat(...digitBuckets);
  }

  return arrayOfNumbers;
};

/**
 * Radix sort is a non-comparative sorting algorithm that works efficiently on non-negative integer arrays. It sorts the elements by their individual digits, starting from the least significant digit (LSD) or the most significant digit (MSD), depending on the implementation.
 *
 * Implementation
 *
 * 1. We find the maximum number of digits. We first determine the maximum number of digits present in the largest number within the input array. This value defines the number of passes required for sorting.
 * 2. We iterate through each digit position (from least significant).
 * 3. In each iteration, we use a counting sort approach to distribute elements based on the value of that specific digit.
 * 4. In the counting sort algorithms
 * - 4.1: Firstly, we create a count array with length of 10 to store the count of occurrences for each digit (0 - 9)
 * - 4.2: We iterate through each element and use the getKthDigit function to extract the digit at position k from the current number.
 * - 4.3: After getting the digit at k position, we increase the count for that digit by 1. This will build a frequency distribution of digits for the current digit position across all elements.
 *
 * 5. We initialize a sortedNums variable to store the elements in the sorted order.
 * 6. We iterate through each element of the nums array from the end to the beginning element.
 * - 6.1: We extract the digit at position k from the current number.
 * - 6.2: We increase the count for that digit by 1. This will ensure the correct placement based on the cumulative count to find the correct sorted position based on the digit value and maintains the order within elements with the same values due to the reverse iteration.
 *
 * 7. After iterating through all digit positions, we return the sortedNums as the result.
 */
const radixSort2 = (nums) => {
  // Find the maximum number of digits in the largest number
  let largestNumber = Math.max(...nums);
  let maxDigits = countNumOfDigits(largestNumber);

  // Sort by each digit, starting from the least significant digit
  for (let digit = 0; digit < maxDigits; digit++) {
    nums = sortByDigits(nums, digit);
  }

  return nums;
};

const sortByDigits = (nums, k) => {
  // Initialize count array
  let count = new Array(10).fill(0);

  // Count occurrences of each digit
  for (let num of nums) {
    let digit = getKthDigit(num, k);
    count[digit] += 1;
  }

  // Calculate cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Initialize the sorted array result
  let sortedNums = new Array(nums.length).fill(0);

  // Replace element in the sorted order
  for (let num = nums.length - 1; num >= 0; num--) {
    let currentNumber = nums[num];
    let digit = getKthDigit(currentNumber, k);

    count[digit] -= 1;
    sortedNums[count[digit]] = currentNumber;
  }

  return sortedNums;
};

console.log(radixSort1([23, 345, 5467, 12, 2345, 9852]));
console.log(radixSort2([23, 345, 5467, 12, 2345, 9852]));

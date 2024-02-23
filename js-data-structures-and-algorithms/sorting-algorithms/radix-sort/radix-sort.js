// @ts-nocheck
import { getDigit, mostDigits } from './radix-helper.js';

/**
 * Pseudocode - Radix Sort
 *
 * 1. Define a function that accepts list of numbers
 * 2. Figure out how many digits the largest number has
 * 3. Loop from `k = 0` up to this `largest number of digits`
 * 4. For each iteration of the loop:
 * 4.1 Create buckets for each digit (0 to 9)
 * 4.2 Place each number in the corresponding bucket based on its `kth` digit
 * 5. Replace existing array with values in buckets, starting with 0 and going up to 9
 * 6. Return list at the end
 */

const radixSort = (arrayOfNumbers) => {
  // Get the max digit in the array of numbers
  let maxDigitCount = mostDigits(arrayOfNumbers);

  for (let k = 0; k < maxDigitCount; k++) {
    /**
     * Creating an empty array of digits with 10 slots. This array will be used to store the numbers based on their `kth` digit during the sorting process.
     */
    let digitBuckets = Array.from({ length: 10 }, () => []);

    /* This `for` loop is iterating through each number in the `arrayOfNumbers` and getting the `kth`
    digit of each number using the `getDigit` function. It then places each number in the
    corresponding bucket based on its `kth` digit using the `digitBuckets` array. */
    for (let i = 0; i < arrayOfNumbers.length; i++) {
      let digit = getDigit(arrayOfNumbers[i], k);
      digitBuckets[digit].push(arrayOfNumbers[i]);
    }

    /* `arrayOfNumbers = [].concat(...digitBuckets);` is flattening the `digitBuckets` array and
    assigning it to `arrayOfNumbers`. The `...` spread operator is used to spread the elements of
    `digitBuckets` into the `concat` method as individual arguments. The `concat` method then
    combines these individual arrays into a single flattened array. This is done to replace the
    existing `arrayOfNumbers` with the sorted numbers in the correct order based on their digits. */
    arrayOfNumbers = [].concat(...digitBuckets);
  }

  return arrayOfNumbers;
};

console.log('========radixSort========');
console.log(radixSort([23, 345, 5467, 12, 2345, 9852]));
console.log('========radixSort========');

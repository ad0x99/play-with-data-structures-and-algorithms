/**
 * QUESTION
 *
 * Given two non-empty arrays of integers, write a function that determines whether the second array is subsequence of the first one.
 *
 * A subsequence of an array is a set of numbers that aren't necessarily adjacent in the array but that are in the same order as they appear in the array.
 *
 * For instance, the numbers [1, 3, 4] form a subsequence of the array [1, 2, 3, 4], and so do the numbers [2, 4]. Note that a single number in an array and the array itself are both valid subsequences of the array.
 *
 * Sample Input:
 * array = [5, 1, 22, 25, 6, -1, 8, 10]
 * sequence = [1, 6, -1, 10]
 *
 * Sample Output:
 * true
 */

/**
 * SOLUTION 1
 *
 * The time complexity of this function is O(n), where n is the length of the input array. This is because we iterate through the array once, checking each element against the corresponding element in the sequence.
 *
 * The space complexity of this function is O(1), as we only use a constant amount of additional space to store the indices.
 */
const isValidSubsequenceWithWhileLoop = (array, sequence) => {
  // Initialize index to traverse
  let arrayIdx = 0;
  let sequenceIdx = 0;

  // We check the index and its length to make sure that we are not out of bounds
  while (arrayIdx < array.length && sequenceIdx < sequence.length) {
    // If we found a match, then increase sequence index by 1 (going to the next element)
    if (array[arrayIdx] === sequence[sequenceIdx]) {
      sequenceIdx += 1;
    }

    arrayIdx += 1;
  }

  // We'll know a valid subsequence is when the sequence index equals to the sequence's length
  // That means we've been through the whole sequence and found all matches
  return sequenceIdx === sequence.length;
};

console.log(
  isValidSubsequenceWithWhileLoop([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, 10])
);

/**
 * SOLUTION 2
 *
 * The time complexity of this function is O(n), where n is the length of the array. This is because the function iterates through each element of the array once.
 *
 * The space complexity of this function is O(1) because it only uses a constant amount of additional space, regardless of the size of the input array or sequence.
 */
const isValidSubsequenceWithForLoop = (array, sequence) => {
  let sequenceIdx = 0;

  // Iterates through the array
  for (const value of array) {
    // Break the loop when we've looped through all the elements of the sequence
    if (sequence[sequenceIdx] === sequence.length) break;

    // If we found a match, move to the next sequence's element
    if (sequence[sequenceIdx] === value) {
      sequenceIdx += 1;
    }
  }

  return sequenceIdx === sequence.length;
};

console.log(
  isValidSubsequenceWithForLoop([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, 10])
);

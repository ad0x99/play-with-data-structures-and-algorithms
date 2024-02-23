/**
 * QUESTION
 *
 * Write a function that takes in an `n x m` two-dimensional array (that can be square-shaped when `n == m`) and returns a one-dimensional array of all the array's elements in spiral order.
 *
 * Spiral order starts at the top left corner of the two-dimensional array, goes to the right, and proceeds in a spiral pattern all the way until every element has been visited.
 *
 * Sample Input:
 * array = [
 *    [1, 2, 3, 4],
 *    [12, 13, 14, 5],
 *    [11, 16, 15, 6],
 *    [10, 9, 8, 7],
 * ]
 *
 * Sample Output:
 * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
 */

/**
 * SOLUTION 1 - Iterating
 *
 * We assume that two-dimensional array is rectangle
 * We'll go through all the outer rectangle to inner one and collect all the elements
 *
 *     startingCol            endingCol
 * startRow    1     2     3   4
 *             12    13    14   5
 *             11    16    15   6
 *  endRow     10     9     8   7
 *
 * The time complexity of this function is O(n), where n is the total number of elements in the input array. This is because the function iterates through each element in the array once.
 *
 * The space complexity of this function is O(1) because it uses a constant amount of additional space to store the result array and the variables for tracking the starting and ending rows and columns. The size of the input array does not affect the amount of additional space used by the function.
 */
const spiralTraverseWithIterating = (array) => {
  let result = [];
  let startRow = 0;
  let endRow = array.length - 1;
  let startCol = 0;
  let endCol = array[0].length - 1;

  while (startRow <= endRow && startCol <= endCol) {
    // Traverse from starting to ending column (from right to left)
    for (let col = startCol; col <= endCol; col++) {
      result.push(array[startRow][col]);
    }

    // Traverse from starting to ending row (from up to down)
    for (let row = startRow + 1; row <= endRow; row++) {
      result.push(array[row][endCol]);
    }

    // Traverse from ending to starting column (from left to right)
    for (let col = endCol - 1; col >= startCol; col--) {
      // Make sure that we don't traverse iterated value again
      if (endRow > startRow) {
        result.push(array[endRow][col]);
      }
    }

    // Traverse from ending to starting row (from down to up)
    for (let row = endRow - 1; row > startRow; row--) {
      // Make sure that we don't traverse iterated value again
      if (endCol > startCol) {
        result.push(array[row][startCol]);
      }
    }

    // Increase/decrease corresponding row and column to continue traversing the next spiral
    startRow += 1;
    endRow -= 1;
    startCol += 1;
    endCol -= 1;
  }

  return result;
};

const array = [
  [1, 2, 3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10, 9, 8, 7],
];
const array1 = [[1, 3, 2, 5, 4, 7, 6]];
const array2 = [[1], [3], [2], [5], [4], [7], [6]];
const array3 = [
  [1, 2, 3, 4],
  [10, 11, 12, 5],
  [9, 8, 7, 6],
];
console.log(spiralTraverseWithIterating(array)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
console.log(spiralTraverseWithIterating(array1)); // [1, 3, 2, 5, 4, 7, 6]
console.log(spiralTraverseWithIterating(array2)); // [1, 3, 2, 5, 4, 7, 6]
console.log(spiralTraverseWithIterating(array3)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

/**
 * SOLUTION 2 - Recursion
 * 
 * The time complexity of this function is O(n), where n is the total number of elements in the input array. This is because the function iterates through each element in the array exactly once.

 * The space complexity of this function is O(n), where n is the total number of elements in the input array. This is because the function uses a result array to store the spiral traversal of the array, and the size of the result array is directly proportional to the number of elements in the input array.
 */
const spiralTraverseWithRecursion = (array) => {
  let result = [];
  let startRow = 0;
  let endRow = array.length - 1;
  let startCol = 0;
  let endCol = array[0].length - 1;

  spiralFill(array, startRow, endRow, startCol, endCol, result);

  return result;
};

const spiralFill = (array, startRow, endRow, startCol, endCol, result) => {
  // If either row or column is overlapped, then we stop recursion
  if (startRow > endRow || startCol > endCol) {
    return;
  }

  // Traverse from starting to ending column (from right to left)
  for (let col = startCol; col <= endCol; col++) {
    result.push(array[startRow][col]);
  }

  // Traverse from starting to ending row (from up to down)
  for (let row = startRow + 1; row <= endRow; row++) {
    result.push(array[row][endCol]);
  }

  // Traverse from ending to starting column (from left to right)
  for (let col = endCol - 1; col >= startCol; col--) {
    // Make sure that we don't traverse iterated value again
    if (endRow > startRow) {
      result.push(array[endRow][col]);
    }
  }

  // Traverse from ending to starting row (from down to up)
  for (let row = endRow - 1; row > startRow; row--) {
    // Make sure that we don't traverse iterated value again
    if (endCol > startCol) {
      result.push(array[row][startCol]);
    }
  }

  // Traverse through the next spiral recursively until we collect all the elements
  return spiralFill(
    array,
    (startRow += 1),
    (endRow -= 1),
    (startCol += 1),
    (endCol -= 1),
    result
  );
};

console.log(spiralTraverseWithRecursion(array)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
console.log(spiralTraverseWithRecursion(array1)); // [1, 3, 2, 5, 4, 7, 6]
console.log(spiralTraverseWithRecursion(array2)); // [1, 3, 2, 5, 4, 7, 6]
console.log(spiralTraverseWithRecursion(array3)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

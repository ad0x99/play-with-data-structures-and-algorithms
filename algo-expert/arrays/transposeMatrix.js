/**
 * QUESTION
 *
 * You're given a 2D array of integers `matrix`. Write a function that returns the transpose of the matrix.
 *
 * The transpose of a matrix is a flipped version of the original matrix across its main diagonal (which runs from top-left to bottom-right); it switches the row and column indices of the original matrix.
 *
 * You can assume the input matrix always has at least 1 value; however its width and height are not necessarily the same.
 *
 * Sample Input #1
 * matrix = [
 *    [1, 2]
 * ]
 *
 * Sample Output #1
 * [
 *    [1],
 *    [2]
 * ]
 *
 * Sample Input #2
 * matrix = [
 *    [1, 2],
 *    [3, 4],
 *    [5, 6]
 * ]
 *
 * Sample Output #2
 * [
 *    [1, 3, 5],
 *    [2, 4, 6]
 * ]
 *
 * Sample Input #3
 * matrix = [
 *    [1, 2, 3],
 *    [4, 5, 6],
 *    [7, 8, 9]
 * ]
 *
 * Sample Output #3
 * [
 *    [1, 4, 7],
 *    [2, 5, 8],
 *    [3, 6, 9]
 * ]
 */
/**
 * SOLUTION 
 * 
 * The time complexity of this function is O(n * m), where n is the number of rows in the matrix and m is the number of columns. This is because we iterate through each element in the matrix once, which takes O(n * m) time.

 * The space complexity of this function is also O(n * m). This is because we create a new matrix to store the transposed values, which has the same dimensions as the original matrix. Therefore, the space required is proportional to the number of elements in the matrix, which is n * m.
 */
const transposeMatrix = (matrix) => {
  let result = [];

  // Iterate one column at a time
  // Each col, create a new row of values to be transposed
  for (let col = 0; col < matrix[0].length; col++) {
    let newRow = [];
    for (let row = 0; row < matrix.length; row++) {
      newRow.push(matrix[row][col]);
    }

    result.push(newRow);
  }

  return result;
};

const matrix1 = [[1, 2]];
const matrix2 = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const matrix3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(transposeMatrix(matrix1)); // [[1], [2]]
console.log(transposeMatrix(matrix2)); // [[1, 3, 5], [2, 4, 6]]
console.log(transposeMatrix(matrix3)); // [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
